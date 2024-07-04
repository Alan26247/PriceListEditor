import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface IColumnListSelectorProps {
    columns: string[],
    onSelect: (value: string) => void,
}

const ColumnListSelector = ({ columns, onSelect }: IColumnListSelectorProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(1000000);

    const handleOnSelect = (event: SelectChangeEvent<number>) => {
        const index = event.target.value as number;
        setCurrentIndex(index);
        
        if(index === 1000000) onSelect('');
        else onSelect(columns[index]);
    };

    return (
        <FormControl sx={{ width: '260px' }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentIndex}
                variant="outlined"
                onChange={handleOnSelect}
            >
                <MenuItem value={1000000}>выбрать из имеющихся</MenuItem>
                {columns.map((column, index) => (
                    <MenuItem key={index} value={index}>{column}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ColumnListSelector;