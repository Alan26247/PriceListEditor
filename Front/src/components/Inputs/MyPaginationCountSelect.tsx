import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export interface IMyPaginationCountSelectProps {
    value: number,
    onChange: (value: number) => void,
}

const MyPaginationCountSelect = ({ value, onChange }: IMyPaginationCountSelectProps) => {

    const handleChange = (event: SelectChangeEvent<number>) => {
        const newValue = event.target.value as number;
        onChange(newValue);
    };

    return (
        <FormControl sx={{ width: '60px' }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                variant="standard"
                onChange={handleChange}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MyPaginationCountSelect;