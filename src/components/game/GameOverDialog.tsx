import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useOthelloStore } from '../../store';

const GameOverDialog = () => {
    const gameOvered = useOthelloStore((store) => store.gameOvered);
    const players = useOthelloStore((store) => store.players);
    const restartGame = useOthelloStore((store) => store.restartGame);
    const winnerPlayer = useMemo(() => {
        if (players[0].discs > players[1].discs) {
            return players[0];
        } else if (players[0].discs < players[1].discs) {
            return players[1];
        }
        return null;
    }, [players]);
    return (
        <Dialog open={gameOvered}>
            <DialogContent sx={{ maxHeight: 400, height: '100%' }}>
                <Typography variant='h3'>
                    {winnerPlayer
                        ? `${winnerPlayer.name || winnerPlayer.color} wins!`
                        : 'Draw'}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={restartGame} fullWidth variant={'contained'}>
                    Restart Game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameOverDialog;
