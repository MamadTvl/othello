import { sleep } from './../utils/index';
import {
    getPlayerLegalMoves,
    getPlayerDiscsCount,
    hasPlayerLegalMove,
} from './../othello/Othello';
import create from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { flipDiscs } from '../othello/Othello';
export type Color = 'white' | 'black';
export type PlayerType = 'Robot' | 'Human';
export interface Player {
    name: string | null;
    color: Color;
    type: PlayerType;
    discs: number;
    legalMoves: [number, number][];
}

export interface Disc {
    color: Color;
}

export interface Context {
    board: (Color | null)[][];
    gameOvered: boolean;
    turn: number;
    players: Player[];
    started: boolean;
}

export interface Store extends Context {
    putDisc: (index: number, move: [number, number]) => void;
    updatePlayer: (index: number, details: Partial<Player>) => void;
    restartGame: () => void;
    startGame: () => void;
    changeMode: (mode: 'Robot' | 'Human', playerId: number) => void;
}

const getInitialBoard = (): (Color | null)[][] => {
    const board = new Array(8);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(8).fill(null);
    }
    board[3][3] = 'white';
    board[4][4] = 'white';
    board[4][3] = 'black';
    board[3][4] = 'black';

    return board;
};

const generateInitialStates = (): Context => {
    return {
        board: getInitialBoard(),
        gameOvered: false,
        turn: 0,
        players: [
            {
                name: null,
                color: 'black',
                discs: 2,
                type: 'Human',
                legalMoves: [],
            },
            {
                name: null,
                color: 'white',
                discs: 2,
                type: 'Human',
                legalMoves: [],
            },
        ],
        started: false,
    };
};

export const useOthelloStore = create<Store>()(
    persist(
        (set) => ({
            ...generateInitialStates(),
            restartGame: () =>
                set(() => {
                    return generateInitialStates();
                }),
            putDisc: (index, move) => {
                set((state) => {
                    const otherPlayerIndex = index === 0 ? 1 : 0;
                    let updatedBoard = [...state.board];
                    const thisPlayer = state.players[index];
                    const otherPlayer = state.players[otherPlayerIndex];
                    let turn = state.turn;
                    const players = [...state.players];
                    updatedBoard[move[0]][move[1]] = thisPlayer.color;
                    updatedBoard = flipDiscs(thisPlayer, move, updatedBoard);
                    players[index].legalMoves = getPlayerLegalMoves(
                        thisPlayer,
                        updatedBoard,
                    );
                    players[otherPlayerIndex].legalMoves = getPlayerLegalMoves(
                        otherPlayer,
                        updatedBoard,
                    );
                    players[index].discs = getPlayerDiscsCount(
                        thisPlayer,
                        updatedBoard,
                    );
                    players[otherPlayerIndex].discs = getPlayerDiscsCount(
                        otherPlayer,
                        updatedBoard,
                    );
                    let gameOvered = false;
                    if (
                        hasPlayerLegalMove(
                            players[otherPlayerIndex],
                            updatedBoard,
                        )
                    ) {
                        turn = otherPlayerIndex;
                    } else if (
                        !hasPlayerLegalMove(players[index], updatedBoard)
                    ) {
                        gameOvered = true;
                    }

                    return {
                        board: updatedBoard,
                        turn,
                        players,
                        gameOvered,
                    };
                });
            },
            updatePlayer: (index, details) =>
                set((state) => ({
                    players: state.players.map((player, i) => ({
                        ...player,
                        ...(i === index ? details : {}),
                    })),
                })),
            startGame: () => {
                set((state) => {
                    return {
                        players: state.players.map((player) => ({
                            ...player,
                            legalMoves: getPlayerLegalMoves(
                                player,
                                state.board,
                            ),
                            discs: getPlayerDiscsCount(player, state.board),
                        })),
                        started: true,
                    };
                });
            },
            changeMode: (mode, playerId) =>
                set((state) => ({
                    players: state.players.map((player, index) => ({
                        ...player,
                        ...(index === playerId ? { type: mode } : {}),
                    })),
                })),
        }),
        {
            name: 'othello-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
