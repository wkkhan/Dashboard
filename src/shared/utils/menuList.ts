export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon: string;
  dropdownMenu?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  name: string;
  path: string;
  subdropdownMenu?: SubSubMenuItem[];
}

export interface SubSubMenuItem {
  id: string;
  name: string;
  path: string;
}

export const menuList: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: '/app',
    icon: 'feather-layout',
    dropdownMenu: [
      {
        id: '1-1',
        name: 'Overview',
        path: '/app',
      },
    ],
  },
  {
    id: '2',
    name: 'Merchants',
    path: '/app/merchants',
    icon: 'feather-briefcase',
    dropdownMenu: [
      {
        id: '2-1',
        name: 'All Merchants',
        path: '/app/merchants',
      },
    ],
  },
  {
    id: '3',
    name: 'Transactions',
    path: '/app/transactions',
    icon: 'feather-dollar-sign',
    dropdownMenu: [
      {
        id: '3-1',
        name: 'All Transactions',
        path: '/app/transactions',
      },
    ],
  },
  {
    id: '4',
    name: 'Reports',
    path: '/app/reports',
    icon: 'feather-pie-chart',
    dropdownMenu: [
      {
        id: '4-1',
        name: 'Sales Reports',
        path: '/app/reports/sales',
      },
      {
        id: '4-2',
        name: 'Transaction Reports',
        path: '/app/reports/transactions',
      },
    ],
  },
  {
    id: '5',
    name: 'Webhooks',
    path: '/app/webhooks',
    icon: 'feather-activity',
    dropdownMenu: [
      {
        id: '5-1',
        name: 'All Webhooks',
        path: '/app/webhooks',
      },
    ],
  },
  {
    id: '6',
    name: 'Settings',
    path: '/app/settings',
    icon: 'feather-settings',
    dropdownMenu: [
      {
        id: '6-1',
        name: 'Profile',
        path: '/app/settings/profile',
      },
      {
        id: '6-2',
        name: 'Preferences',
        path: '/app/settings/preferences',
      },
    ],
  },
];

