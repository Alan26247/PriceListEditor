import { TextField } from "@mui/material";

export interface IMyNumberFildWithoutLabelProps {
    value: string,
    onChange: (value: string) => void,
}

const MyNumberFildWithoutLabel = ({ value, onChange }: IMyNumberFildWithoutLabelProps) => {

    return (
        <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="number"
        />
    )
}

export default MyNumberFildWithoutLabel;