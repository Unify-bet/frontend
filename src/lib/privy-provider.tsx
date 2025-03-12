import { PrivyProvider as PrivyAuthProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';

// In Vite, use import.meta.env to access environment variables
// Note: Environment variables must be prefixed with VITE_ to be exposed
const PRIVY_APP_ID = (import.meta.env.VITE_PRIVY_APP_ID) as string;

interface PrivyProviderProps {
  children: ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  // Validate that we have an app ID
  if (!PRIVY_APP_ID || PRIVY_APP_ID.trim() === '') {
    throw new Error('Privy App ID is not properly configured');
  }

  return (
    <PrivyAuthProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'light',
          accentColor: '#0070f3',
          logo: '/logo.png',
        },
      }}
    >
      {children}
    </PrivyAuthProvider>
  );
} 