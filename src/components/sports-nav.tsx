import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FolderRoot as Football, ShoppingBasket as Basketball, Tent as Tennis, Ticket as Cricket, Baseline as Baseball, Dumbbell, Gamepad2, Flag, Table as TableTennis, Bike } from "lucide-react";

const sports = [
  { name: "Football", icon: Football },
  { name: "Basketball", icon: Basketball },
  { name: "Tennis", icon: Tennis },
  { name: "Cricket", icon: Cricket },
  { name: "Baseball", icon: Baseball },
  { name: "MMA", icon: Dumbbell },
  { name: "ESports", icon: Gamepad2 },
  { name: "F1", icon: Flag },
  { name: "Table Tennis", icon: TableTennis },
  { name: "Cycling", icon: Bike },
];

interface SportsNavProps {
  activeSport: string;
  onSportChange: (sport: string) => void;
}

export function SportsNav({ activeSport, onSportChange }: SportsNavProps) {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] border-r">
      <div className="space-y-1 p-2 w-[240px]">
        {sports.map((sport) => {
          const Icon = sport.icon;
          return (
            <Button
              key={sport.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeSport === sport.name && "bg-muted"
              )}
              onClick={() => onSportChange(sport.name)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {sport.name}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}