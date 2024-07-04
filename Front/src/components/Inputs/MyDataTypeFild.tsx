import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export interface IMyDataTypeFildProps {
    value: number,
    onChange: (value: number) => void,
}

const MyDataTypeFild = ({ value, onChange }: IMyDataTypeFildProps) => {

    const handleChange = (event: SelectChangeEvent<number>) => {
        const newValue = event.target.value as number;
        onChange(newValue);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                variant="outlined"
                onChange={handleChange}
            >
                <MenuItem value={0}>строка</MenuItem>
                <MenuItem value={1}>число</MenuItem>
                <MenuItem value={2}>многострочный текст</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MyDataTypeFild;