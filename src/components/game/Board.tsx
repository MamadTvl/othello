import { Button, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useOthelloStore } from '../../store';
import Block from './Block';
import GameOverDialog from './GameOverDialog';
import GameStatus from './GameStatus';
import useRobot from './hooks/useRobot';

const Table = styled('table')({});

const TableBody = styled('tbody')({});

const TableRow = styled('tr')({});

const Board: React.FC = () => {
    const board = useOthelloStore((store) => store.board);
    const restartGame = useOthelloStore((store) => store.restartGame);
    useRobot();

    return (
        <>
            <GameOverDialog />
            <GameStatus />
            <Table>
                <TableBody>
                    {board.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((item, colIndex) => (
                                <Block
                                    key={colIndex}
                                    isDisc={!!item}
                                    color={item}
                                    position={[rowIndex, colIndex]}
                                />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button sx={{ mt: 2 }} variant={'contained'} onClick={restartGame}>
                Restart Game
            </Button>
        </>
    );
};

export default Board;
