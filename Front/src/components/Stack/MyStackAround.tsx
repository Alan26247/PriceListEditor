import { Stack } from "@mui/material";


const MyStackAround = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems={'center'}
            flexWrap={'wrap'}
            width={'100%'}
            paddingLeft={2}
            paddingRight={2}
            boxSizing={'border-box'}
            gap={2}
        >
            {children}
        </Stack>
    )
}

export default MyStackAround;