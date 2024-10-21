import {
  Airdrop,
  Cpu,
  DollarCircle,
  Element3,
  Layer,
  Message2,
  People,
  ProfileCircle,
  Setting2,
  Whatsapp,
  Home2,
} from 'iconsax-react';
export const adminSidebarLinks = [
  {
    heading: 'Home',
    links: [
      {
        icon: Element3,
        label: 'Dashboard',
        path: '/',
        permission: 'GETPROFITS',
      },
      {
        icon: Home2,
        label: 'Business',
        path: '/business',
        permission: 'All',
      },
      {
        icon: Message2,
        label: 'Request SMS',
        path: '/request-sms-transactions',
        permission: 'GETTRANSACTIONS',
      },
      {
        icon: DollarCircle,
        label: 'Wallet Transactions',
        path: '/wallet-transactions',
        permission: 'GETTRANSACTIONS',
      },
      {
        icon: Whatsapp,
        label: 'Send Message',
        path: '/messaging',
        permission: 'SENDMESSAGING',
      },
    ],
  },
  {
    heading: 'Manage',
    links: [
      {
        icon: Airdrop,
        label: 'Use cases',
        path: '/use-cases',
        permission: 'All',
      },
      {
        icon: Cpu,
        label: 'Mars AI',
        path: '/mars-ai',
        permission: 'GETONDEMANDAPPLICATION',
      },
      {
        icon: Cpu,
        label: 'Industries',
        path: '/industries',
        permission: 'All',
      },
      {
        icon: People,
        label: 'Users',
        path: '/users-management',
        permission: 'GETUSERS',
      },
      {
        icon: ProfileCircle,
        label: 'Admin',
        path: '/admin-management',
        permission: 'GETADMINS',
      },
      {
        icon: Layer,
        label: 'Roles',
        path: '/roles-management',
        permission: 'CRTROLE',
      },
    ],
  },
  {
    heading: 'Account',
    links: [
      {
        icon: Setting2,
        label: 'Settings',
        path: '/settings',
        permission: 'All',
      },
    ],
  },
];

// userType: 'CUSTOM',
// file: File {
//   name: 'machine-readable-business-employment-data-mar-2024-quarter.csv',
//   lastModified: 1720100042007,
//   type: 'text/csv',
//   size: 3583192,
//   Symbol(kHandle): Blob {},
//   Symbol(kLength): 3583192,
//   Symbol(kType): 'text/csv'
// },
// message: 'This is Felix from instantotp's
