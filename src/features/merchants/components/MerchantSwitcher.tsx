import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useMerchants, type MerchantOption } from '../../../app/providers/MerchantProvider';

const formatMerchantLabel = (merchant: MerchantOption) => {
  const name = merchant.profile?.name ?? merchant.merchantId;
  return merchant.role ? `${name} • ${merchant.role}` : name;
};

export function MerchantSwitcher() {
  const {
    merchants,
    activeMerchantId,
    isLoading,
    isSwitching,
    needsSelection,
    setActiveMerchantId,
  } = useMerchants();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const nextId = event.target.value;
    setPendingId(nextId);
    try {
      await setActiveMerchantId(nextId);
    } finally {
      setPendingId(null);
    }
  };

  if (isLoading) {
    return <span className="text-muted small">Loading merchants…</span>;
  }

  if (!merchants.length) {
    return <span className="text-muted small">No merchants available</span>;
  }

  const currentValue = pendingId ?? activeMerchantId ?? merchants[0]?.merchantId ?? '';

  return (
    <div className="d-flex align-items-center">
      <label htmlFor="merchant-switcher" className="form-label me-2 mb-0 text-dark small" style={{ color: '#6b7280' }}>
        Merchant
      </label>
      <select
        id="merchant-switcher"
        className="form-select form-select-sm"
        value={currentValue}
        onChange={handleChange}
        disabled={isSwitching}
        aria-describedby={needsSelection ? 'merchant-switcher-help' : undefined}
        aria-busy={isSwitching}
      >
        {merchants.map((merchant) => (
          <option key={merchant.merchantId} value={merchant.merchantId}>
            {formatMerchantLabel(merchant)}
          </option>
        ))}
      </select>
      {needsSelection ? (
        <span id="merchant-switcher-help" className="ms-2 small text-warning">
          Select a merchant to continue
        </span>
      ) : null}
    </div>
  );
}

export default MerchantSwitcher;
