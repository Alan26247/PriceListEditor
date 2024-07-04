import { Button } from "@mui/material";

export interface IMyButtonProps {
    text: string,
    onClick: () => void,
}

const MyButton = ({ text, onClick }: IMyButtonProps) => {
    return (
        <Button variant="contained" onClick={onClick}>
          {text}
        </Button>
    )
}

export default MyButton;