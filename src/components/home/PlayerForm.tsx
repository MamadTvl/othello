import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Player, PlayerType, useOthelloStore } from '../../store';


const PlayerForm: React.FC<{ player: Player; id: number }> = ({
    player,
    id,
}) => {
    const updatePlayer = useOthelloStore((store) => store.updatePlayer);

    const handleChangeMode = useCallback(
        (type: keyof Player) => (event: any) => {
            updatePlayer(id, { [type]: event.target.value });
        },
        [id],
    );

    return (
        <Grid
            container
            spacing={1}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Grid item xs={2} display={'flex'}>
                <Box
                    sx={{
                        backgroundColor: player.color,
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    color='primary'
                    sx={{
                        '& .MuiInputBase-input': {
                            color: '#fff',
                        },
                    }}
                    variant='outlined'
                    label={`name`}
                    value={player.name || ''}
                    onChange={handleChangeMode('name')}
                />
            </Grid>
            <Grid item xs={4}>
                <Select value={player.type} onChange={handleChangeMode('type')}>
                    <MenuItem value={'Robot'}>{'Robot'}</MenuItem>
                    <MenuItem value={'Human'}>{'Human'}</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
};

export default PlayerForm;
