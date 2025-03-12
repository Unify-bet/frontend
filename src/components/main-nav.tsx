import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, Grid as Bridge, Gift, Wallet } from "lucide-react";
import { WalletConnect } from "@/components/wallet-connect";

const navItems = [
  { name: "Exchange", icon: BarChart2, isActive: true },
  { name: "Rewards", icon: Gift },
  { name: "Staking", icon: Wallet },
  { name: "Analytics", icon: BarChart2 },
  { name: "Bridge", icon: Bridge },
];

export function MainNav() {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex-shrink-0 mr-6 pl-8">
        <a href="/">
          <img 
            src="/logo-white.png" 
            alt="Unify.bet Logo" 
            className="h-8" 
          />
        </a>
      </div>
      
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors",
                item.isActive 
                  ? "text-primary hover:text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Button>
          );
        })}
      </nav>
      <div className="ml-auto">
        <WalletConnect />
      </div>
    </div>
  );
}