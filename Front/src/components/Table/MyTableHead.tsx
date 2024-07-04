import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

export interface IMyTableHeadProps {
    columns: string[],
    columnWidths?: string[] | null,
}

const MyTableHead = ({ columns, columnWidths }: IMyTableHeadProps) => {
    return (
        <TableHead sx={{ backgroundColor: '#dff3eea3' }}>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key={index}
                        width={columnWidths ? columnWidths[index] : undefined}
                        align="left"
                    >
                        <Typography>{column}</Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default MyTableHead;