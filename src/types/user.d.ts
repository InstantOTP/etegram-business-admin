export interface User {
  userID: string;
  username: string;
  email: string;
  isVerified: boolean;
  phone: string;
  status: string;
  referral: string;
  totalReferral: number;
  referralCode: string;
  totalTransactions: number;
  isPINset: boolean;
  rentedNumbers: number;
  pushedNumbers: number;
  wallet: number;
  referralWallet: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  adminID: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  role: string;
  twoFactorAuthentication: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  transactionID: string;
  userID: string;
  amount: number;
  type: string;
  status: string;
  providerID?: string;
  providerName?: string;
  applicationID?: string;
  applicationName?: string;
  countryID?: string;
  countryName?: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber?: string;
  requestID?: string;
  id: string;
  kycApprovalStatus?: string;
}

export interface Roles {
  title: string;
  permissions: string[];
  admins: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Permissions {
  name: string;
  code: string;
}

export interface ServiceCharges {
  minimumWithdrawalAmount: string;
  withdrawalCharges: string;
  referralBonus: string;
}

export interface Providers {
  providerID: string;
  providerName: string;
  providerIcon: string;
  providerKey: string;
  description: string;
  charges: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnDemandApp {
  name: string;
  icon: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface OnDemandAppNumbers {
  onDemandApplication: {
    name: string;
    icon: string;
    status: string;
    id: string;
  };
  number: string;
  password: string;
  sold: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
}
