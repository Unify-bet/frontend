import { useState } from "react";
import { BetSlip as BetSlipType, Bet } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Receipt, X } from "lucide-react";

interface BetSlipProps {
  betSlip: BetSlipType;
  onRemoveBet: (betId: string) => void;
  onUpdateStake: (betId: string, stake: number) => void;
  onPlaceBets: () => void;
}

export function BetSlip({ betSlip, onRemoveBet, onUpdateStake, onPlaceBets }: BetSlipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-4 right-4 shadow-lg bg-primary"
          size="lg"
        >
          <Receipt className="mr-2 h-5 w-5" />
          Bet Slip ({betSlip.bets.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-background/95 backdrop-blur-sm">
        <SheetHeader>
          <SheetTitle>Your Bet Slip</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <ScrollArea className="h-[calc(100vh-240px)]">
            {betSlip.bets.map((bet) => (
              <div
                key={bet.id}
                className="mb-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm relative border border-border/50"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 hover:text-destructive"
                  onClick={() => onRemoveBet(bet.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="mb-3">
                  <p className="font-medium text-sm">Match ID: {bet.matchId}</p>
                  <p className="text-sm text-muted-foreground">
                    Type: {bet.type.toUpperCase()} @ {bet.odds.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Input
                    type="number"
                    placeholder="Enter stake"
                    value={bet.stake || ""}
                    onChange={(e) =>
                      onUpdateStake(bet.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-background/50"
                  />
                  <div className="text-sm font-medium whitespace-nowrap">
                    Win: ${bet.potentialWin.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4 border-t border-border/50 pt-4">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Total Stake:</span>
              <span className="font-medium">${betSlip.totalStake.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-muted-foreground">Potential Win:</span>
              <span className="font-medium text-primary">${betSlip.totalPotentialWin.toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              disabled={betSlip.bets.length === 0}
              onClick={() => {
                onPlaceBets();
                setIsOpen(false);
              }}
            >
              Place Bets
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}