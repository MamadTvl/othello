import { styled } from '@mui/material';
import React from 'react';
import { useOthelloStore } from '../store';
import Block from './Block';

const Table = styled('table')({});

const TableBody = styled('tbody')({});

const TableRow = styled('tr')({});


const Board: React.FC = () => {
    const board = useOthelloStore((store) => store.board);

    return (
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
    );
};

export default Board;
