import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be more longer 6' }),
});

export const SignUpSchema = z
  .object({
    // firstname: z.string().min(1, { message: 'First name is required' }),
    // lastname: z.string().min(1, { message: 'First name is required' }),
    username: z
      .string()
      .min(5, { message: 'Username must contain at least 5 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    phone: z
      .string()
      .min(11, { message: 'Invalid Phone number' })
      .max(11, { message: 'Invalid Phone number' }),
    password: z.string().min(6, { message: 'Password must be more longer 6' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be more longer 6' }),
    consent: z
      .string({ required_error: 'Click on the checkbox to proceed' })
      .includes('on', { message: 'Click on the checkbox to proceed' }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ForgotpasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
});

export const TopUpSchema = z.object({
  amount: z.coerce.number().refine((val) => val >= 10, {
    message: 'Minimum amount is NGN10.00',
  }),
});

export const WithdrawBalanceSchema = z.object({
  bankName: z.string().min(1, { message: 'Bank Name is required' }),
  accountNumber: z.string().min(1, { message: 'Account number is required' }),
  accountName: z.string(),
  amount: z.coerce.number().refine((val) => val >= 10, {
    message: 'Minimum amount is NGN10.00',
  }),
});

export const WithdrawToMoniecheapSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  amount: z.coerce.number().refine((val) => val >= 10, {
    message: 'Minimum amount is NGN10.00',
  }),
});

export const UpdateProfileSchema = z.object({
  firstname: z.string().min(1, { message: 'Firstname is required.' }),
  lastname: z.string().min(1, { message: 'Lastname is required.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Enter A valid email' }),
  phone: z
    .string()
    .min(11, { message: 'Invalid Phone number' })
    .max(11, { message: 'Invalid Phone number' }),
});

export const UpdatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Password must be more longer 6' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be more longer 6' }),
    confirmNewPassword: z
      .string()
      .min(6, { message: 'Password must be more longer 6' }),
  })
  .refine(
    ({ confirmNewPassword, newPassword }) => confirmNewPassword === newPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmNewPassword'],
    }
  );

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be more longer 6' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be more longer 6' }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const RoleSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
});

export const UpdatePinSchema = z
  .object({
    pin: z.string().min(4, { message: 'Invalid Pin' }),
    confirmPin: z.string().min(4, { message: 'Invalid Pin' }),
  })
  .refine(({ confirmPin, pin }) => confirmPin === pin, {
    message: 'Pin do not match',
    path: ['confirmPin'],
  });

export const ServiceChargeSchema = z.object({
  minimumWithdrawalAmount: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
  withdrawalCharges: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
  referralBonus: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
});

export const providerDetailsSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  providerName: z.string().min(1, { message: 'Provider name is required' }),
  providerIcon: z.string().min(1, { message: 'Icon URL is required' }),
  charges: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
});

export const providerKeySchema = z.object({
  providerKey: z.string().min(1, { message: 'providerKey is required' }),
});

const ACCEPTED_FILE_TYPES = ['text/csv'];
export const sendMessageSchema = z.object({
  message: z.string().min(1, { message: 'Message is required' }),
  messageType: z.string().min(1, { message: 'Message Type is required' }),
  userType: z.string().min(1, { message: 'Target User is required' }),
  file: z
    .instanceof(File)
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file?.type as string);
    }, 'File must be a .csv')
    .optional(),
});

export const createOnDemandAppSchema = z.object({
  icon: z.string().min(1, { message: 'Icon Url is required' }),
  name: z.string().min(1, { message: 'App name is required' }),
  amount: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
});

export const updateOnDemandAppSchema = z.object({
  icon: z.string().min(1, { message: 'Icon Url is required' }),
  name: z.string().min(1, { message: 'App name is required' }),
  amount: z.coerce.number().refine((val) => val >= 0, {
    message: 'Minimum amount is NGN0.00',
  }),
  status: z.string().min(1, { message: 'Status is required' }),
});

export const createOnDemandAppProfileSchema = z.object({
  icon: z.string().min(1, { message: 'Icon Url is required' }),
  number: z.string().min(1, { message: 'Number is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  description: z.string(),
});

export const updateOnDemandAppProfileSchema = z.object({
  icon: z.string().min(1, { message: 'Icon Url is required' }),
  number: z.string().min(1, { message: 'Number is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  description: z.string(),
});

export const CreateAdminSchema = z.object({
  firstname: z.string().min(1, { message: 'Firstname is required.' }),
  lastname: z.string().min(1, { message: 'Lastname is required.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Enter A valid email' }),
  phone: z
    .string()
    .min(11, { message: 'Invalid Phone number' })
    .max(11, { message: 'Invalid Phone number' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

export const CreateIndustrySchema = z.object({
  name: z.string().min(1, { message: 'Industry is required' }),
  description: z.string(),
});

export const UseCaseSchema = z.object({
  name: z.string().min(1, { message: 'Industry is required' }),
  description: z.string(),
});
