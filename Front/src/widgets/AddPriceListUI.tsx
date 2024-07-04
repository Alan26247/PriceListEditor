import { Paper, Table, TableBody, TableContainer, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { outInfo } from 'app/stores/infoSlice';
import { setSpinner } from 'app/stores/spinnerSlice';
import { addPriceList } from "shared/api/PriceList";
import { ColumnItem } from "entities/ColumnItem";
import { setMode } from "app/stores/modeSlice";
import { ServiceModes } from "shared/enums/ServiceModes";
import MyTableHead from "components/Table/MyTableHead";
import MyTextFild from "components/Inputs/MyTextFild";
import MyTableRowColumn from "components/Table/MyTableRowColumn";
import { DataTypes } from "shared/enums/DataTypes";
import MyButton from "components/MyTextFild";
import MyStackBetween from "components/Stack/MyStackBetween";
import MyStackAround from "components/Stack/MyStackAround";

const AddPriceListUI = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [columns, setColumns] = useState<ColumnItem[]>([]);

    const returnBack = () => {
        dispatch(setMode(ServiceModes.PriceListArrayUI));
    }

    const addNewPriceList = () => {
        dispatch(setSpinner(true));
        addPriceList({
            Name: name,
            Columns: columns,
        }).then((res) => {
            dispatch(outInfo({
                isSuccess: true,
                text: 'Прайс лист успешно добавлен',
            }));
            dispatch(setSpinner(false));
            dispatch(setMode(ServiceModes.PriceListArrayUI));
            return;
        }).catch((err) => {
            dispatch(outInfo({
                isSuccess: false,
                text: err.data.description,
            }));
            dispatch(setSpinner(false));
        })
    }

    const addColumn = () => {
        columns.push({ name: '', dataType: DataTypes.String });
        setColumns([...columns]);
    }

    const setColumnItem = (index: number, value: string, dataType: DataTypes) => {
        columns[index].name = value;
        columns[index].dataType = dataType;
        setColumns([...columns]);
    }

    const deleteColumnItem = (index: number) => {
        columns.splice(index, 1);
        setColumns([...columns]);
    }

    return (
        <>
            <MyStackBetween>
                <MyButton text='назад к списку' onClick={returnBack} />
            </MyStackBetween>

            <MyStackBetween>
                <Typography variant="h5" paddingLeft={6}>Добавление нового прайс листа</Typography>
                <MyButton text='создать прайс лист' onClick={addNewPriceList} />
            </MyStackBetween>

            <MyTextFild title="Название прайс-листа" value={name} onChange={setName} />

            <TableContainer component={Paper}>
                <Table aria-label="customized  table">

                    <MyTableHead
                        columns={['№ колонки', 'Значение', 'Тип данных', '']}
                        columnWidths={['160px', 'auto', '240px', '100px']}
                    />

                    <TableBody>
                        {columns.map((column, index) => (
                            <MyTableRowColumn
                                key={index}
                                columnIndex={index}
                                name={column.name}
                                dataType={column.dataType}
                                onChange={setColumnItem}
                                onDelete={deleteColumnItem}
                            />
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <MyStackAround>
                <MyButton text='добавить колонку' onClick={addColumn} />
            </MyStackAround>
        </>
    );
}

export default AddPriceListUI;