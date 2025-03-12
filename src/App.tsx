import { useState } from 'react';
import { Match, BetSlip as BetSlipType, Bet } from '@/types';
import { MainNav } from '@/components/main-nav';
import { SportsNav } from '@/components/sports-nav';
import { MatchCard } from '@/components/match-card';
import { BetSlip } from '@/components/bet-slip';
import { v4 as uuidv4 } from 'uuid';

// Mock data
const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'Football',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    startTime: '2025-03-20T15:00:00',
    odds: { home: 2.1, draw: 3.4, away: 3.2 },
    isLive: true,
    score: { home: 1, away: 0 },
  },
  {
    id: '2',
    sport: 'Football',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    startTime: '2025-03-20T17:30:00',
    odds: { home: 1.9, draw: 3.5, away: 3.8 },
    isLive: false,
  },
  {
    id: '3',
    sport: 'Basketball',
    homeTeam: 'LA Lakers',
    awayTeam: 'Golden State Warriors',
    startTime: '2025-03-20T19:00:00',
    odds: { home: 1.7, draw: 15.0, away: 2.1 },
    isLive: true,
    score: { home: 87, away: 82 },
  },
];

function App() {
  const [activeSport, setActiveSport] = useState('Football');
  const [betSlip, setBetSlip] = useState<BetSlipType>({
    bets: [],
    totalStake: 0,
    totalPotentialWin: 0,
  });

  const filteredMatches = mockMatches.filter(match => match.sport === activeSport);

  const handleBetSelect = (matchId: string, type: 'home' | 'draw' | 'away', odds: number) => {
    const newBet: Bet = {
      id: uuidv4(),
      matchId,
      type,
      odds,
      stake: 0,
      potentialWin: 0,
    };

    setBetSlip(prev => ({
      ...prev,
      bets: [...prev.bets, newBet],
    }));
  };

  const handleRemoveBet = (betId: string) => {
    setBetSlip(prev => {
      const newBets = prev.bets.filter(bet => bet.id !== betId);
      const totalStake = newBets.reduce((sum, bet) => sum + bet.stake, 0);
      const totalPotentialWin = newBets.reduce((sum, bet) => sum + bet.potentialWin, 0);
      return { bets: newBets, totalStake, totalPotentialWin };
    });
  };

  const handleUpdateStake = (betId: string, stake: number) => {
    setBetSlip(prev => {
      const newBets = prev.bets.map(bet => {
        if (bet.id === betId) {
          const potentialWin = stake * bet.odds;
          return { ...bet, stake, potentialWin };
        }
        return bet;
      });
      const totalStake = newBets.reduce((sum, bet) => sum + bet.stake, 0);
      const totalPotentialWin = newBets.reduce((sum, bet) => sum + bet.potentialWin, 0);
      return { bets: newBets, totalStake, totalPotentialWin };
    });
  };

  const handlePlaceBets = () => {
    console.log('Placing bets:', betSlip);
    setBetSlip({ bets: [], totalStake: 0, totalPotentialWin: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <div className="flex">
        <aside className="w-[240px] flex-shrink-0">
          <SportsNav activeSport={activeSport} onSportChange={setActiveSport} />
        </aside>

        <main className="flex-1 p-6">
          <div className="grid gap-4">
            {filteredMatches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                onBetSelect={handleBetSelect}
              />
            ))}
          </div>
        </main>
      </div>

      <BetSlip
        betSlip={betSlip}
        onRemoveBet={handleRemoveBet}
        onUpdateStake={handleUpdateStake}
        onPlaceBets={handlePlaceBets}
      />
    </div>
  );
}

export default App;