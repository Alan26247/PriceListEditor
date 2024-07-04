import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { DataTypes } from "shared/enums/DataTypes";
import DeleteIcon from '@mui/icons-material/Delete';
import MyDataTypeFild from "components/Inputs/MyDataTypeFild";
import { useEffect, useState } from "react";
import ColumnListSelector from "components/Inputs/ColumnListSelector";
import { getPriceListAllColumns } from "shared/api/PriceList";
import MyStackBetween from "components/Stack/MyStackBetween";

export interface IMyTableRowColumnProps {
    columnIndex: number,
    name: string,
    dataType: DataTypes,
    onChange: (index: number, name: string, dataType: DataTypes) => void
    onDelete: (index: number) => void
}

const MyTableRowColumn = ({ columnIndex, name, dataType, onChange, onDelete }: IMyTableRowColumnProps) => {

    const [currentName, setName] = useState(name);
    const [currentDataType, setDataType] = useState<DataTypes>(dataType);
    const [columnNames, setColumnNames] = useState<string[]>([]);

    useEffect(() => {
        getColumnNames();
    }, []);

    const getColumnNames = () => {
        getPriceListAllColumns()
            .then((res) => {
                setColumnNames(res.data.data);
                return;
            }
            )
    }

    const onChangeName = (value: string) => {
        onChange(columnIndex, value, currentDataType);
        setName(value);
    }

    const onChangeDataType = (value: DataTypes) => {
        onChange(columnIndex, currentName, value);
        setDataType(value);
    }

    const onSelectColumnName = (value: string) => {
        onChange(columnIndex, value, currentDataType);
        setName(value);
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            hover={true}
        >
            <TableCell align="left">
                <Typography paddingLeft={4}>
                    {columnIndex + 1}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <MyStackBetween>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="outlined-basic"
                        variant="outlined"
                        value={name}
                        onChange={(e) => onChangeName(e.target.value)}
                    />
                    <ColumnListSelector columns={columnNames} onSelect={onSelectColumnName} />
                </MyStackBetween>
            </TableCell>
            <TableCell align="left">
                <MyDataTypeFild value={dataType} onChange={onChangeDataType} />
            </TableCell>
            <TableCell align="center">
                <Button onClick={() => onDelete(columnIndex)}>
                    <DeleteIcon />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default MyTableRowColumn;