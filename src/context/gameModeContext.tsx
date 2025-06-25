'use client'

// game mode context

import { createContext, useState } from "react";

export const GameModeContext = createContext({
	gameMode: 'quick',
	setGameMode: (value: string) => { },
});

export const GameModeProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameMode, setGameMode] = useState<string>('quick');
	return (
		<GameModeContext.Provider value={{ gameMode, setGameMode }}>
			{children}
		</GameModeContext.Provider>
	);
};

