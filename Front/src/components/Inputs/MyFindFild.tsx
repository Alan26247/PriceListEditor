import { Button, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export interface IMyFindFildProps {
    value: string,
    onChange: (value: string) => void,
}

const MyFindFild = ({ value, onChange }: IMyFindFildProps) => {
    return (
        <Stack direction={'row'} gap={2} alignItems={'center'}>
          <SearchIcon/>
          <TextField
            variant="standard"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <Button onClick={(e) => onChange('')}>
            <CloseIcon fontSize="small" />
          </Button>
        </Stack>
    )
}

export default MyFindFild;