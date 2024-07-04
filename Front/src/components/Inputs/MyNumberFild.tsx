import { TextField } from "@mui/material";
import { useState } from "react";

export interface IMyNumberFildProps {
    title: string,
    value: string,
    onChange: (value: string) => void,
}

const MyNumberFild = ({ title, value, onChange }: IMyNumberFildProps) => {

    return (
        <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={value}
            label={title}
            onChange={(e) => onChange(e.target.value)}
            type="number"
        />
    )
}

export default MyNumberFild;