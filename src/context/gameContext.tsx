'use client';

import { createContext, useContext, useState } from 'react';
import { AllGameStatus, Company, Game, GameContextType, Player } from '@/types/gameTypes';

// ----------------------
// Game Context
// ----------------------

export const GameContext = createContext<GameContextType>({
	loading: true,
	player: null,
	setPlayer: () => {},
	company: null,
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
	const [game, setGame] = useState<Game | null>(null);
	const [gameStatus, setGameStatus] = useState<AllGameStatus>(null);

	const [maxPlayerNumber, setMaxPlayerNumber] = useState<number>(0);
	const [joinedPlayerNumber, setJoinedPlayerNumber] = useState<number>(0);
	const [userName, setUserName] = useState<string>('');
	const [time, setTime] = useState<number>(0);
	const [start, setStart] = useState<boolean>(false);
	const [gameMode, setGameMode] = useState<string>('quick');

	return (
		<GameContext.Provider
			value={{
				loading,
				player,
				setPlayer,
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
