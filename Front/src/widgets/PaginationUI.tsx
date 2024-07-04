import { Pagination, Stack } from '@mui/material';

export interface IPaginationUIProps {
    page: number;
    pageCount: number;
    onChange: (value: number) => void;
}

const PaginationUI = ({page, pageCount, onChange}: IPaginationUIProps) => {

    return (
        <Stack spacing={2} width={'100%'} justifyContent={'center'} alignItems={'center'} margin={4}>
            <Pagination 
                count={pageCount} 
                page={page} 
                variant="outlined" 
                shape="rounded" 
                onChange={(event, value) => onChange(value)}
                />
        </Stack>
    );
}

export default PaginationUI;