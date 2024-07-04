import { TextField } from "@mui/material";

export interface IMyTextFildProps {
    title: string,
    value: string,
    onChange: (value: string) => void,
}

const MyTextFild = ({ title, value, onChange }: IMyTextFildProps) => {
    return (
        <TextField
            id="outlined-basic"
            label={title}
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default MyTextFild;