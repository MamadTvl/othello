import { ButtonBase, styled, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { Color, useOthelloStore } from '../../store';

const TableData = styled('td')(({ theme }) => ({
    width: 70,
    height: 70,
    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40,
    },
}));
export const Disc = styled(ButtonBase)(({ theme }) => ({
    borderRadius: '50%',
    width: 60,
    height: 60,
    [theme.breakpoints.down('sm')]: {
        width: 30,
        height: 30,
    },
}));

const Block: React.FC<BlockProps> = ({ isDisc, color, position }) => {
    const turn = useOthelloStore((store) => store.turn);
    const players = useOthelloStore((store) => store.players);
    const putDisc = useOthelloStore((store) => store.putDisc);

    const discStyle: SxProps<Theme> | null = useMemo(() => {
        if (isDisc) {
            return {
                backgroundColor: color || players[turn].color,
                cursor: 'default',
            };
        } else if (
            players[turn].legalMoves.find(
                (move) => move[0] === position[0] && move[1] === position[1],
            )
        ) {
            return {
                border: `1px solid ${color || players[turn].color}`,
                backgroundColor: 'transparent',
            };
        }
        return null;
    }, [color, isDisc, position, turn, players]);

    const handleClick = useCallback(() => {
        if (isDisc || players[turn].type === 'Robot') {
            return;
        }
        putDisc(turn, position);
    }, [turn, position, isDisc]);

    return (
        <TableData sx={{ backgroundColor: 'darkgreen' }}>
            {discStyle && <Disc sx={discStyle} onClick={handleClick} />}
        </TableData>
    );
};

export interface BlockProps {
    isDisc: boolean;
    color: Color | null;
    position: [number, number];
}
export default Block;
