import { useDispatch } from 'react-redux';
import { closeInfo } from 'app/stores/infoSlice';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

interface IModalInfoUIProps {
    isOpen: boolean,
    description: string,
    isSuccess: boolean,
}

const ModalInfoUI = ({ isOpen, description, isSuccess }: IModalInfoUIProps) => {

    const dispatch = useDispatch();

    const close = () => {
        dispatch(closeInfo());
    }

    return (
        <>
            {isOpen && (
                <Box
                    display={'flex'}
                    height={'100vh'}
                    width={'100vw'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#000000e0' }}
                >
                    <Stack width={'100%'} padding={2} justifyContent={'center'} alignItems={'center'}>
                        <Paper 
                            style={{backgroundColor: isSuccess ? '#bdffda' : '#fdcb8f'}} 
                            sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
                            <Stack gap={2}>
                                <Typography variant='h5' align='center'>{isSuccess ? 'УСПЕШНО' : 'ОШИБКА'}</Typography>
                                <Typography>{description}</Typography>
                                <Divider />
                                <Stack direction={'row'} justifyContent={'space-around'} sx={{ width: '100%' }}>
                                    <Button sx={{ width: '200px' }} variant="contained" onClick={close}>ок</Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default ModalInfoUI;