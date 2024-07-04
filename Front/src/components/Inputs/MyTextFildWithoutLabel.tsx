import { TextField } from "@mui/material";

export interface IMyTextFildWithoutLabelProps {
    value: string,
    onChange: (value: string) => void,
}

const MyTextFildWithoutLabel = ({ value, onChange }: IMyTextFildWithoutLabelProps) => {

    return (
        <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default MyTextFildWithoutLabel;