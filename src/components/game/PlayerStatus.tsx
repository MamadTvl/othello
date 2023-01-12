import { Box, Typography } from '@mui/material';
import { Player } from '../../store';
import { Disc } from './Block';

const PlayerStatus: React.FC<{ player: Player }> = ({ player }) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Typography variant='body1'>{player.name}</Typography>
            <Disc sx={{ backgroundColor: player.color }}>
                <Typography color={'green'} variant='h5'>
                    {player.discs}
                </Typography>
            </Disc>
        </Box>
    );
};
export default PlayerStatus;
