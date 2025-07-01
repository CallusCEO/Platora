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
		joinedPlayerNumber,
		setPlayer,
		setGame,
		player,
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

			// check if the game is not full or already started
			const { data: game2, error: gameFetchError2 } = await supabase
				.from('games')
				.select('*')
				.eq('id', inputGameId)
				.single();

			if (gameFetchError2) throw gameFetchError2;
			if (!game2) throw new Error('Game not found');

			if (game2.joined_player_number >= game2.max_player_number)
				throw new Error('Game is full');
			if (game2.status === 'started' || game2.status === 'ended')
				throw new Error('Game is already started');
			setGameId(inputGameId);

			// Check if player already exists
			const { data: existingPlayer, error: playerFetchError } = await supabase
				.from('players')
				.select('*')
				.eq('game_id', inputGameId)
				.eq('name', inputName);

			if (playerFetchError) throw playerFetchError;

			if (!existingPlayer || existingPlayer.length === 0) {
				// Insert player if not exists
				const { data: playerData, error: insertError } = await supabase
					.from('players')
					.insert({
						game_id: inputGameId,
						name: inputName,
						wealth: 0,
						location: null,
						stats_json: null,
					});

				if (insertError) throw insertError;
			}

			// get the player data
			const { data: playerData, error: playerFetchError2 } = await supabase
				.from('players')
				.select('*')
				.eq('game_id', inputGameId)
				.eq('name', inputName)
				.single();

			if (playerFetchError2) throw playerFetchError2;
			setPlayer(playerData);

			const { error: gameUpdateError } = await supabase
				.from('games')
				.update({
					joined_player_number: game2.joined_player_number + 1,
				})
				.eq('id', inputGameId);

			if (gameUpdateError) throw gameUpdateError;

			// Update local state
			setUserName(inputName);
		} catch (err: any) {
			// Handle different types of errors
			let errorMessage = 'Unknown error joining game';
			if (err?.message) {
				errorMessage = err.message;
			} else if (typeof err === 'string') {
				errorMessage = err;
			} else if (err?.error_description || err?.error) {
				errorMessage = err.error_description || err.error;
			}

			setError(errorMessage);
			console.error('Join game error:', {
				error: err,
				errorMessage,
				timestamp: new Date().toISOString(),
			});
		} finally {
			setLoading(false);
		}
	};

	const quitGame = async () => {
		setError(null);

		try {
			if (!gameId) throw new Error('No game found to quit.');

			const { data: playerData, error: playerFetchError } = await supabase
				.from('players')
				.select('*')
				.eq('id', player?.id)
				.single();

			if (playerFetchError) throw playerFetchError;

			if (!playerData) throw new Error('Player not found');

			const { error: gameUpdateError } = await supabase
				.from('games')
				.update({
					joined_player_number: joinedPlayerNumber - 1,
				})
				.eq('id', gameId);

			if (gameUpdateError) throw gameUpdateError;

			setGameId('');
			setPlayer(null);
			setGame(null);
			setGameStatus(null);
			setJoinedPlayerNumber(0);
			setMaxPlayerNumber(0);
			setUserName('');
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

	const startGame = async () => {
		setLoading(true);
		setError(null);

		try {
			if (!gameId) throw new Error('No game selected for starting.');

			const { error: gameUpdateError } = await supabase
				.from('games')
				.update({
					status: 'started',
				})
				.eq('id', gameId);

			if (gameUpdateError) throw gameUpdateError;

			setGameStatus('started');
		} catch (err: any) {
			setError(err.message || 'Unknown error');
			console.error('Start game error:', JSON.stringify(err, null, 2));
		} finally {
			setLoading(false);
		}
	};

	return { createGame, joinGame, deleteGame, readGame, quitGame, startGame, loading, error };
};
