'use client'

// game context

import { createContext, useState } from "react";

export const GameContext = createContext({
    playerNumber: 0,
    setPlayerNumber: (value: number) => { },
    userName: '',
    setUserName: (value: string) => { },
    time: 0,
    setTime: (value: number) => { },
    start: false,
    setStart: (value: boolean) => { },
});

export const GameModeContext = createContext({
	gameMode: 'quick',
	setGameMode: (value: string) => { },
});


export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [playerNumber, setPlayerNumber] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const [time, setTime] = useState<number>(0);
    const [start, setStart] = useState<boolean>(false);
    const [gameMode, setGameMode] = useState<string>('quick');
    return (
        <GameContext.Provider value={{ playerNumber, setPlayerNumber, userName, setUserName, time, setTime, start, setStart }}>
            <GameModeContext.Provider value={{ gameMode, setGameMode }}>
                {children}
            </GameModeContext.Provider>
        </GameContext.Provider>
    );
};

