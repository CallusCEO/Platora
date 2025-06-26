'use client';
import { useGame, useGameMode } from '@/context/gameContext';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGameActions = () => {
	const { setGameId, setUserName, setMaxPlayerNumber, setGameStatus, setJoinedPlayerNumber } =
		useGame();
	const { setGameMode } = useGameMode();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createGame = async (
		inputGameMode: string,
		inputPlayerNumber: number,
		inputName: string
	) => {
		setLoading(true);
		setError(null);

		try {
			const newGameId = uuidv4();

			// Insert new game first
			const { error: gameError } = await supabase.from('games').insert({
				id: newGameId,
				mode: inputGameMode,
				max_player_number: inputPlayerNumber,
				joined_player_number: 1,
				status: 'waiting',
				created_at: new Date(),
				time: 0,
				max_time: 30,
				tick_interval: 3,
			});

			if (gameError) throw gameError;

			// Insert first player referencing game_id
			const { error: playerError } = await supabase.from('players').insert({
				game_id: newGameId,
				name: inputName,
				wealth: 0,
				location: null,
				stats_json: null,
			});

			if (playerError) throw playerError;

			// Update local state
			setGameId(newGameId);
			setUserName(inputName);
			setMaxPlayerNumber(inputPlayerNumber);
			setGameMode(inputGameMode);
			setGameStatus('waiting');
			setJoinedPlayerNumber(1);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Create game error:', JSON.stringify(err, null, 2));
		} finally {
			setLoading(false);
		}
	};

	const joinGame = async (inputGameId: string, inputName: string) => {
		if (!inputGameId || !inputName) return;

		setLoading(true);
		setError(null);

		try {
			// Check if game exists
			const { data: game, error: gameFetchError } = await supabase
				.from('games')
				.select('id')
				.eq('id', inputGameId)
				.single();

			if (gameFetchError) throw gameFetchError;

			// Check if player already exists
			const { data: existingPlayer, error: playerFetchError } = await supabase
				.from('players')
				.select('*')
				.eq('game_id', inputGameId)
				.eq('name', inputName);

			if (playerFetchError) throw playerFetchError;

			if (!existingPlayer || existingPlayer.length === 0) {
				// Insert player if not exists
				const { error: insertError } = await supabase.from('players').insert({
					game_id: inputGameId,
					name: inputName,
					wealth: 0,
					location: null,
					stats_json: null,
				});

				if (insertError) throw insertError;
			}

			// Update local state
			setGameId(inputGameId);
			setUserName(inputName);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Join game error:', JSON.stringify(err, null, 2));
		} finally {
			setLoading(false);
		}
	};

	return { createGame, joinGame, loading, error };
};
