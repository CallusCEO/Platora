'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { PlayerStatsType } from '@/types/playerStatsType';

// ----------------------
// Game Context
// ----------------------

type Player = {
	id: string;
	name: string;
	wealth: number;
	game_id: string;
	user_id: string;
	stats_json?: PlayerStatsType;
};

type Company = {
	id: string;
	name: string;
	player_id: string;
	game_id: string;
	value: number;
};

type GameContextType = {
	user: User | null;
	loading: boolean;
	player: Player | null;
	company: Company | null;
	gameId: string | null;

	playerNumber: number;
	setPlayerNumber: (value: number) => void;
	userName: string;
	setUserName: (value: string) => void;
	time: number;
	setTime: (value: number) => void;
	start: boolean;
	setStart: (value: boolean) => void;
};

export const GameContext = createContext<GameContextType>({
	user: null,
	loading: true,
	player: null,
	company: null,
	gameId: null,
	playerNumber: 0,
	setPlayerNumber: () => {},
	userName: '',
	setUserName: () => {},
	time: 0,
	setTime: () => {},
	start: false,
	setStart: () => {},
});

// ----------------------
// Game Mode Context
// ----------------------

export const GameModeContext = createContext({
	gameMode: 'quick',
	setGameMode: (value: string) => {},
});

// ----------------------
// Provider
// ----------------------

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const [player, setPlayer] = useState<Player | null>(null);
	const [company, setCompany] = useState<Company | null>(null);
	const [gameId, setGameId] = useState<string | null>(null);

	const [playerNumber, setPlayerNumber] = useState<number>(0);
	const [userName, setUserName] = useState<string>('');
	const [time, setTime] = useState<number>(0);
	const [start, setStart] = useState<boolean>(false);
	const [gameMode, setGameMode] = useState<string>('quick');

	// 1. Load user on mount
	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (data?.user) setUser(data.user);
			if (error) console.error('Auth error:', error.message);
			setLoading(false);
		};
		fetchUser();
	}, []);

	// 2. Load player data after user is loaded
	useEffect(() => {
		if (!user) return;

		const fetchPlayer = async () => {
			const { data, error } = await supabase
				.from('players')
				.select('*')
				.eq('user_id', user.id)
				.single();

			if (data) {
				setPlayer(data);
				setGameId(data.game_id);
			} else if (error) {
				console.warn('No player found:', error.message);
			}
		};

		fetchPlayer();

		const channel = supabase
			.channel(`realtime:players:${user.id}`)
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'players', filter: `user_id=eq.${user.id}` },
				(payload) => {
					console.log('🔁 Player updated:', payload);
					if (payload.new) setPlayer(payload.new as Player);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [user]);

	// 3. (Optional) Load company if player exists
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
				user,
				loading,
				player,
				company,
				gameId,
				playerNumber,
				setPlayerNumber,
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
