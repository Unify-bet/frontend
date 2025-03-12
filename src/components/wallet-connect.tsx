import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export function WalletConnect() {
  const { login, logout, authenticated, user } = usePrivy();

  if (!authenticated) {
    return (
      <Button 
        onClick={login} 
        className="flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={logout}
      >
        <Wallet className="h-4 w-4" />
        {user?.wallet?.address 
          ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` 
          : 'Wallet Connected'}
      </Button>
    </div>
  );
} 