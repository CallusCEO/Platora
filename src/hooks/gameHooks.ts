'use client';
import { useGame, useGameMode } from '@/context/gameContext';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGameActions = () => {
	const {
		setGameId,
		setUserName,
		setMaxPlayerNumber,
		setGameStatus,
		setJoinedPlayerNumber,
		gameId,
		setPlayer,
		setGame,
	} = useGame();
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

	const readGame = async (gameIdArg: string) => {
		setError(null);

		try {
			// 1. Fetch game data
			const { data: game, error: gameFetchError } = await supabase
				.from('games')
				.select('*')
				.eq('id', gameIdArg)
				.single();

			if (gameFetchError) throw gameFetchError;

			// 3. Update local state
			setGame(game);
			setMaxPlayerNumber(game.max_player_number);
			setJoinedPlayerNumber(game.joined_player_number);
			// setGameMode(game.mode);
			// setGameStatus(game.status);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Read game error:', JSON.stringify(err, null, 2));
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
				.select('*')
				.eq('id', inputGameId)
				.single();

			if (gameFetchError) throw gameFetchError;

			if (!game) throw new Error('Game not found');

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

			const { error: gameUpdateError } = await supabase
				.from('games')
				.update({
					joined_player_number: game.joined_player_number + 1,
				})
				.eq('id', inputGameId);

			if (gameUpdateError) throw gameUpdateError;

			// Update local state
			setGameId(inputGameId);
			setUserName(inputName);
			setPlayer(existingPlayer[0]);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Join game error:', JSON.stringify(err, null, 2));
		} finally {
			setLoading(false);
		}
	};

	const quitGame = async () => {
		setError(null);

		try {
			if (!gameId) throw new Error('No game selected for deletion.');

			const { data: game, error: gameFetchError } = await supabase
				.from('games')
				.select('*')
				.eq('id', gameId)
				.single();

			if (gameFetchError) throw gameFetchError;

			if (!game) throw new Error('Game not found');

			const { error: gameUpdateError } = await supabase
				.from('games')
				.update({
					joined_player_number: game.joined_player_number - 1,
				})
				.eq('id', gameId);

			if (gameUpdateError) throw gameUpdateError;
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Quit game error:', JSON.stringify(err, null, 2));
		}
	};

	const deleteGame = async () => {
		setLoading(true);
		setError(null);

		try {
			if (!gameId) throw new Error('No game selected for deletion.');

			// 1. Delete all related players (to avoid foreign key constraint)
			const { error: deletePlayersError } = await supabase
				.from('players')
				.delete()
				.eq('game_id', gameId);

			if (deletePlayersError) throw deletePlayersError;

			// 2. Delete the game itself
			const { error: deleteGameError } = await supabase
				.from('games')
				.delete()
				.eq('id', gameId);

			if (deleteGameError) throw deleteGameError;

			// 3. Reset local state
			setGameId('');
			setMaxPlayerNumber(0);
			setGameMode('quick');
			setGameStatus(null);
			setJoinedPlayerNumber(0);
			setPlayer(null);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Delete game error:', JSON.stringify(err, null, 2));
		} finally {
			setLoading(false);
		}
	};

	return { createGame, joinGame, deleteGame, readGame, quitGame, loading, error };
};
