'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AllGameStatus, Company, GameContextType, Player } from '@/types/gameTypes';

// ----------------------
// Game Context
// ----------------------

export const GameContext = createContext<GameContextType>({
	loading: true,
	player: null,
	company: null,
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
	start: false,
	setStart: () => {},
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

	const [player, setPlayer] = useState<Player | null>(null);
	const [company, setCompany] = useState<Company | null>(null);
	const [gameId, setGameId] = useState<string | null>(null);
	const [gameStatus, setGameStatus] = useState<AllGameStatus>(null);

	const [maxPlayerNumber, setMaxPlayerNumber] = useState<number>(0);
	const [joinedPlayerNumber, setJoinedPlayerNumber] = useState<number>(0);
	const [userName, setUserName] = useState<string>('');
	const [time, setTime] = useState<number>(0);
	const [start, setStart] = useState<boolean>(false);
	const [gameMode, setGameMode] = useState<string>('quick');

	// Load player after gameId and userName are set
	useEffect(() => {
		if (!userName || !gameId) return;

		const fetchPlayer = async () => {
			const { data, error } = await supabase
				.from('players')
				.select('*')
				.eq('name', userName)
				.eq('game_id', gameId)
				.single();

			if (data) {
				setPlayer(data);
			} else if (error) {
				console.warn('No player found:', error.message);
			}
			setLoading(false);
		};

		fetchPlayer();
	}, [userName, gameId]);

	// Load company when player is ready
	useEffect(() => {
		if (!player) return;

		const fetchCompany = async () => {
			const { data, error } = await supabase
				.from('companies')
				.select('*')
				.eq('player_id', player.id)
				.single();

			if (data) {
				setCompany(data);
			} else if (error) {
				console.warn('No company found:', error.message);
			}
		};

		fetchCompany();
	}, [player]);

	return (
		<GameContext.Provider
			value={{
				loading,
				player,
				company,
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
				start,
				setStart,
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
