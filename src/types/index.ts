export interface Match {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  isLive: boolean;
  score?: {
    home: number;
    away: number;
  };
}

export interface Bet {
  id: string;
  matchId: string;
  type: 'home' | 'draw' | 'away';
  odds: number;
  stake: number;
  potentialWin: number;
}

export interface BetSlip {
  bets: Bet[];
  totalStake: number;
  totalPotentialWin: number;
}