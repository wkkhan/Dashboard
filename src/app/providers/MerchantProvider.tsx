import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { MerchantAssignment, MerchantProfile } from '../../features/auth/api/auth.api';
import { useAuth } from './AuthProvider';

export type MerchantOption = MerchantAssignment & {
  profile?: MerchantProfile;
};

type MerchantContextValue = {
  merchants: MerchantOption[];
  merchantDirectory: Record<string, MerchantProfile>;
  activeMerchantId: string | null;
  activeMerchant: MerchantOption | null;
  isLoading: boolean;
  isSwitching: boolean;
  needsSelection: boolean;
  setActiveMerchantId: (merchantId: string) => Promise<void>;
  refreshMerchants: () => Promise<void>;
};

const MerchantContext = createContext<MerchantContextValue | undefined>(undefined);

export function MerchantProvider({ children }: PropsWithChildren) {
  const {
    assignments,
    activeAssignment,
    isAuthenticated,
    isInitializing,
    needsMerchantSelection,
    switchMerchant,
    fetchAssignments,
    merchantDirectory,
  } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(isInitializing);
  const [isSwitching, setIsSwitching] = useState(false);
  const [didFetchAssignments, setDidFetchAssignments] = useState(false);

  useEffect(() => {
    setIsLoading(isInitializing);
  }, [isInitializing]);

  useEffect(() => {
    if (!isAuthenticated) {
      setDidFetchAssignments(false);
      setIsLoading(false);
      return;
    }

    if (assignments.length > 0) {
      setDidFetchAssignments(true);
      setIsLoading(false);
      return;
    }

    if (!didFetchAssignments) {
      setIsLoading(true);
      fetchAssignments()
        .catch((error) => {
          console.error('Failed to fetch merchant assignments', error);
        })
        .finally(() => {
          setDidFetchAssignments(true);
          setIsLoading(false);
        });
    }
  }, [assignments.length, didFetchAssignments, fetchAssignments, isAuthenticated]);

  const setActiveMerchantId = useCallback(
    async (merchantId: string) => {
      if (!merchantId || merchantId === activeAssignment?.merchantId) {
        return;
      }

      setIsSwitching(true);
      try {
        await switchMerchant(merchantId);
      } finally {
        setIsSwitching(false);
      }
    },
    [activeAssignment?.merchantId, switchMerchant]
  );

  const refreshMerchants = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchAssignments();
    } finally {
      setIsLoading(false);
    }
  }, [fetchAssignments]);

  const activeMerchantId = activeAssignment?.merchantId ?? null;
  const merchants: MerchantOption[] = useMemo(
    () =>
      assignments.map((assignment) => ({
        ...assignment,
        profile: merchantDirectory[assignment.merchantId],
      })),
    [assignments, merchantDirectory]
  );

  const activeMerchant = useMemo<MerchantOption | null>(() => {
    const found = merchants.find((merchant) => merchant.merchantId === activeMerchantId);
    if (found) {
      return found;
    }
    if (activeAssignment) {
      return {
        ...activeAssignment,
        profile: merchantDirectory[activeAssignment.merchantId],
      };
    }
    return null;
  }, [activeAssignment, activeMerchantId, merchantDirectory, merchants]);

  const value = useMemo<MerchantContextValue>(
    () => ({
      merchants,
      merchantDirectory,
      activeMerchantId,
      activeMerchant,
      isLoading,
      isSwitching,
      needsSelection: needsMerchantSelection || !activeMerchantId,
      setActiveMerchantId,
      refreshMerchants,
    }),
    [
      activeMerchant,
      activeMerchantId,
      isLoading,
      isSwitching,
      needsMerchantSelection,
      merchantDirectory,
      merchants,
      refreshMerchants,
      setActiveMerchantId,
    ]
  );

  return <MerchantContext.Provider value={value}>{children}</MerchantContext.Provider>;
}

export function useMerchants() {
  const context = useContext(MerchantContext);

  if (!context) {
    throw new Error('useMerchants must be used within a MerchantProvider');
  }

  return context;
}
