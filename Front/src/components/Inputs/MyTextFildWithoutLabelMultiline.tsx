import { TextField } from "@mui/material";

export interface IMyTextFildWithoutLabelMultilineProps {
    value: string,
    onChange: (value: string) => void,
}

const MyTextFildWithoutLabelMultiline = ({ value, onChange }: IMyTextFildWithoutLabelMultilineProps) => {

    return (
        <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={value}
            multiline
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default MyTextFildWithoutLabelMultiline;