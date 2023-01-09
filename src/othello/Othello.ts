import { Context, Player } from '../store';

const moveDirections: [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const isValidBlock = (row: number, column: number) => {
    return 0 <= row && row < 8 && 0 <= column && column < 8;
};

export const getPlayerLegalMoves = (
    player: Player,
    board: Context['board'],
): [number, number][] => {
    const moves: [number, number][] = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isPlayerLegalMove(player, [i, j], board)) {
                moves.push([i, j]);
            }
        }
    }
    return moves;
};

export const hasPlayerLegalMove = (
    player: Player,
    board: Context['board'],
): boolean => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isPlayerLegalMove(player, [i, j], board)) {
                return true;
            }
        }
    }
    return false;
};

export const isPlayerLegalMove = (
    player: Player,
    move: [number, number],
    board: Context['board'],
): boolean => {
    if (isValidBlock(move[0], move[1]) && !board[move[0]][move[1]]) {
        for (const direction of moveDirections) {
            if (canDiscFlip(player, move, direction, board)) {
                return true;
            }
        }
    }
    return false;
};

const canDiscFlip = (
    player: Player,
    move: [number, number],
    direction: [number, number],
    board: Context['board'],
): boolean => {
    let i = 1;
    while (true) {
        const row = move[0] + direction[0] * i;
        const column = move[1] + direction[1] * i;
        if (!isValidBlock(row, column) || !board[row][column]) {
            return false;
        } else if (board[row][column] === player.color) {
            break;
        } else {
            i++;
        }
    }
    return i > 1;
};

export const flipDiscs = (
    player: Player,
    move: [number, number],
    board: Context['board'],
): Context['board'] => {
    const updatedBoard = [...board];
    for (const direction of moveDirections) {
        if (canDiscFlip(player, move, direction, updatedBoard)) {
            let i = 1;
            while (true) {
                const row = move[0] + direction[0] * i;
                const column = move[1] + direction[1] * i;
                console.log(updatedBoard[row][column], [row, column]);
                if (updatedBoard[row][column] === player.color) {
                    break;
                } else {
                    updatedBoard[row][column] = player.color;
                    i++;
                }
            }
        }
    }
    return updatedBoard;
};

export const getPlayerDiscsCount = (
    player: Player,
    board: Context['board'],
): number => {
    let count = 0;
    for (const rowBoard of board) {
        for (const item of rowBoard) {
            if (item === player.color) {
                count++;
            }
        }
    }
    return count;
};

export const isTheGameOver = (
    players: Player[],
    board: Context['board'],
): boolean => {
    return (
        !hasPlayerLegalMove(players[0], board) &&
        !hasPlayerLegalMove(players[1], board)
    );
};
