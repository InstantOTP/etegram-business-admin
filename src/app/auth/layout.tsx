import AuthNavbar from '@/components/layouts/auth-navbar';
import { ThemeProvider } from '@/components/theme-provider';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const theme = useTheme();
  // console.log(theme);
  return (
    <ThemeProvider
      storageKey='theme'
      attribute='class'
      defaultTheme='light'
      enableSystem
    >
      <div>
        <AuthNavbar />
        {children}
      </div>
    </ThemeProvider>
  );
}
