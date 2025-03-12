import { Match } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MatchCardProps {
  match: Match;
  onBetSelect: (matchId: string, type: 'home' | 'draw' | 'away', odds: number) => void;
}

export function MatchCard({ match, onBetSelect }: MatchCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-sm">{match.sport}</h3>
            {match.isLive && (
              <Badge variant="destructive" className="animate-pulse bg-red-500/80">
                LIVE
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {match.isLive ? "Live" : new Date(match.startTime).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="font-medium text-sm">{match.homeTeam}</p>
            {match.score && (
              <p className="text-xl font-bold text-primary">{match.score.home}</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">vs</p>
            {match.score && <p className="text-xl font-bold">-</p>}
          </div>
          <div className="text-center">
            <p className="font-medium text-sm">{match.awayTeam}</p>
            {match.score && (
              <p className="text-xl font-bold text-primary">{match.score.away}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="w-full h-auto py-2 px-1 hover:bg-primary group"
            onClick={() => onBetSelect(match.id, 'home', match.odds.home)}
          >
            <div className="w-full overflow-hidden">
              <div className="font-medium text-sm truncate group-hover:text-primary-foreground">Home</div>
              <div className="text-lg font-bold text-primary group-hover:text-black">
                {match.odds.home.toFixed(2)}
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto py-2 px-1 hover:bg-primary group"
            onClick={() => onBetSelect(match.id, 'draw', match.odds.draw)}
          >
            <div className="w-full overflow-hidden">
              <div className="font-medium text-sm truncate group-hover:text-primary-foreground">Draw</div>
              <div className="text-lg font-bold text-primary group-hover:text-black">
                {match.odds.draw.toFixed(2)}
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto py-2 px-1 hover:bg-primary group"
            onClick={() => onBetSelect(match.id, 'away', match.odds.away)}
          >
            <div className="w-full overflow-hidden">
              <div className="font-medium text-sm truncate group-hover:text-primary-foreground">Away</div>
              <div className="text-lg font-bold text-primary group-hover:text-black">
                {match.odds.away.toFixed(2)}
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}