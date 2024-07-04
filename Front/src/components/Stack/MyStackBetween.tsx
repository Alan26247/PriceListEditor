import { Stack } from "@mui/material";


const MyStackBetween = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
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

export default MyStackBetween;