import { Box, Button, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { useOthelloStore } from '../../store';
import PlayerForm from './PlayerForm';

const Container = styled(Box)({
    maxWidth: 300,
    backgroundColor: 'darkgreen',
    borderRadius: 4,
    padding: '24px',
});

const Home: React.FC = () => {
    const players = useOthelloStore((store) => store.players);
    const startGame = useOthelloStore((store) => store.startGame);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3'>Othello</Typography>
                </Grid>
                {players.map((player, index) => {
                    return (
                        <Grid item key={index} xs={12}>
                            <PlayerForm player={player} id={index} />
                        </Grid>
                    );
                })}
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={startGame}>
                        Start
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
