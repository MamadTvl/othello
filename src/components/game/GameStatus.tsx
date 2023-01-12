import { Box, Grid, Typography } from '@mui/material';
import { useOthelloStore } from '../../store';
import PlayerStatus from './PlayerStatus';

const GameStatus = () => {
    const players = useOthelloStore((store) => store.players);
    const turn = useOthelloStore((store) => store.turn);

    return (
        <Grid
            container
            spacing={2}
            alignItems={'center'}
            sx={{ mb: 2 }}>
            <Grid item xs={3}>
                <PlayerStatus player={players[0]} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h4' color={'primary'}>
                    {`${players[turn].name || players[turn].color}'s Turn`}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <PlayerStatus player={players[1]} />
            </Grid>
        </Grid>
    );
};

export default GameStatus;
