import {
    getPlayerLegalMoves,
    getPlayerDiscsCount,
    hasPlayerLegalMove,
} from './../othello/Othello';
import create from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { flipDiscs } from '../othello/Othello';
export type Color = 'white' | 'black';

export interface Player {
    name: string;
    color: Color;
    isRobot: boolean;
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
    mode: 'robot' | 'friendly';
    started: boolean;
}

export interface Store extends Context {
    putDisc: (index: number, move: [number, number]) => void;
    updatePlayer: (index: number, details: Partial<Player>) => void;
    gameOver: () => void;
    restartGame: () => void;
    startGame: () => void;
    changeMode: (mode: Context['mode']) => void;
    // todo: start the game
    // todo: change mode of the game
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

const initialStates: Context = {
    board: getInitialBoard(),
    gameOvered: false,
    turn: 0,
    players: [
        {
            name: '',
            color: 'black',
            discs: 2,
            isRobot: false,
            legalMoves: [],
        },
        {
            name: '',
            color: 'white',
            discs: 2,
            isRobot: false,
            legalMoves: [],
        },
    ],
    mode: 'friendly',
    started: false,
};

export const useOthelloStore = create<Store>()(
    persist(
        (set) => ({
            ...initialStates,
            restartGame: () => set(() => initialStates),
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
                    if (
                        hasPlayerLegalMove(
                            players[otherPlayerIndex],
                            updatedBoard,
                        )
                    ) {
                        turn = otherPlayerIndex;
                    }

                    return {
                        board: updatedBoard,
                        turn,
                        players,
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
            gameOver: () => {},
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
            changeMode: (mode) => {},
        }),
        {
            name: 'othello-storage',
            storage: createJSONStorage(() => sessionStorage)
        },
    ),
);
