import { useDispatch } from 'react-redux';
import { outInfo } from 'app/stores/infoSlice';
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { deletePriceListItem } from 'shared/api/PriceListItem';

interface IModalDeletePriceListItemUIProps {
    priceListItemId: number,
    name: string,
    onClose: () => void,
    onDelete: () => void,
}

const ModalDeletePriceListItemUI = ({ priceListItemId, name, onClose, onDelete }: IModalDeletePriceListItemUIProps) => {

    const dispatch = useDispatch();

    const deleteCurrentSetting = () => {
        deletePriceListItem(priceListItemId)
            .then((res) => {
                dispatch(outInfo({
                    isSuccess: true,
                    text: 'Товар успешно удален',
                }));
                onDelete();
                onClose();
                return;
            }).catch((err) => {
                dispatch(outInfo({
                    isSuccess: false,
                    text: err.data.description,
                }));
                onClose();
            })
    }

    return (
        <>
            <Box
                display={'flex'}
                height={'100vh'}
                width={'100vw'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#000000e0' }}
            >
                <Stack width={'100%'} padding={2} justifyContent={'center'} alignItems={'center'}>
                    <Paper sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
                        <Stack gap={2}>
                            <Typography variant='h5' align='center'>Удаление позиции</Typography>
                            <Typography>Удалить позицию ({name}) ?</Typography>
                            <Stack direction={'row'} justifyContent={'space-around'} sx={{ width: '100%' }}>
                                <Button onClick={onClose}>отмена</Button>
                                <Button onClick={deleteCurrentSetting}>удалить</Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        </>
    );
}

export default ModalDeletePriceListItemUI;