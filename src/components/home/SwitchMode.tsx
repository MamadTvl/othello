import { Box, Switch, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useOthelloStore } from '../../store';

const SwitchMode: React.FC = () => {
    const mode = useOthelloStore((store) => store.mode);
    const setMode = useOthelloStore((store) => store.changeMode);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            // setMode(checked ? 'friendly' : 'robot');
        },
        [setMode],
    );

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant='h6'>{'Robot'}</Typography>
            <Switch checked={mode === 'friendly'} onChange={handleChange} />
            <Typography variant='h6'>{'Friendly'}</Typography>
        </Box>
    );
};

export default SwitchMode;
