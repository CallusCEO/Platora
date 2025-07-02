'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AllGameStatus, Company, Game, GameContextType, Player } from '@/types/gameTypes';
import { supabase } from '@/lib/supabaseClient';

// ----------------------
// Game Context
// ----------------------

export const GameContext = createContext<GameContextType>({
	loading: true,
	player: null,
	startedAt: null,
	setStartedAt: () => {},
	setPlayer: () => {},
	company: null,
	setCompany: () => {},
	game: null,
	setGame: () => {},
	gameId: null,
	setGameId: () => {},
	gameStatus: 'waiting',
	setGameStatus: () => {},
	maxPlayerNumber: 0,
	setMaxPlayerNumber: () => {},
	joinedPlayerNumber: 0,
	setJoinedPlayerNumber: () => {},
	userName: '',
	setUserName: () => {},
	time: 0,
	setTime: () => {},
	talent: '',
	setTalent: () => {},
});

export const GameModeContext = createContext({
	gameMode: 'quick',
	setGameMode: (value: string) => {},
});

// ----------------------
// Provider
// ----------------------

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const [startedAt, setStartedAt] = useState<string | null>(null);

	const [player, setPlayer] = useState<Player | null>(null);
	const [company, setCompany] = useState<Company | null>(null);
	const [gameId, setGameId] = useState<string | null>(null);
	const [game, setGame] = useState<Game | null>(null);
	const [gameStatus, setGameStatus] = useState<AllGameStatus>(null);

	const [maxPlayerNumber, setMaxPlayerNumber] = useState<number>(0);
	const [joinedPlayerNumber, setJoinedPlayerNumber] = useState<number>(0);
	const [userName, setUserName] = useState<string>('');
	const [time, setTime] = useState<number>(0);
	const [gameMode, setGameMode] = useState<string>('quick');
	const [talent, setTalent] = useState<string>('');

	// Subscribe to real-time changes on the games table for this gameId
	useEffect(() => {
		if (!gameId) return;

		const subscription = supabase
			.channel('public:games')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameId}` },
				(payload) => {
					console.log('Change received!', payload);
					if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
						setGame(payload.new as Game);
						setGameStatus(payload.new.status);
						setJoinedPlayerNumber(payload.new.joined_player_number);
						setMaxPlayerNumber(payload.new.max_player_number);
					} else if (payload.eventType === 'DELETE') {
						setGame(null);
					}
				}
			)
			.subscribe();

		// Cleanup on unmount or gameId change
		return () => {
			supabase.removeChannel(subscription);
		};
	}, [gameId]);

	return (
		<GameContext.Provider
			value={{
				startedAt,
				setStartedAt,
				loading,
				player,
				setPlayer,
				company,
				setCompany,
				gameId,
				setGameId,
				gameStatus,
				setGameStatus,
				maxPlayerNumber,
				setMaxPlayerNumber,
				joinedPlayerNumber,
				setJoinedPlayerNumber,
				userName,
				setUserName,
				time,
				setTime,
				talent,
				setTalent,
				game,
				setGame,
			}}
		>
			<GameModeContext.Provider value={{ gameMode, setGameMode }}>
				{children}
			</GameModeContext.Provider>
		</GameContext.Provider>
	);
};

// ----------------------
// Hooks
// ----------------------

export const useGame = () => useContext(GameContext);
export const useGameMode = () => useContext(GameModeContext);
