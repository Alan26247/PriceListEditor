import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { outInfo } from 'app/stores/infoSlice';
import { setSpinner } from 'app/stores/spinnerSlice';
import { setMode } from "app/stores/modeSlice";
import { ServiceModes } from "shared/enums/ServiceModes";
import MyTextFild from "components/Inputs/MyTextFild";
import { DataTypes } from "shared/enums/DataTypes";
import MyNumberFild from "components/Inputs/MyNumberFild";
import { RootState } from "app/store";
import MyTextFildWithoutLabel from "components/Inputs/MyTextFildWithoutLabel";
import MyNumberFildWithoutLabel from "components/Inputs/MyNumberFildWithoutLabel";
import MyTextFildWithoutLabelMultiline from "components/Inputs/MyTextFildWithoutLabelMultiline";
import { addPriceListItem } from "shared/api/PriceListItem";
import MyTableHead from "components/Table/MyTableHead";
import MyStackBetween from "components/Stack/MyStackBetween";
import MyButton from "components/MyTextFild";

const AddPriceListItemUI = () => {

    const dispatch = useDispatch();

    const price = useSelector((state: RootState) => state.price);

    const [values, setValues] = useState<string[]>((): string[] => {
        let data: string[] = [];
        for (let i = 0; i < price.columns!.length; i++) {
            data.push('');
        }
        return data;
    });

    const returnBack = () => {
        dispatch(setMode(ServiceModes.PriceListUI));
    }

    const addNewPriceListItem = () => {
        dispatch(setSpinner(true));
        addPriceListItem({
            PriceListId: price.id as number,
            Values: values,
        }).then((res) => {
            dispatch(outInfo({
                isSuccess: true,
                text: 'Позиция успешно добавлена',
            }));
            dispatch(setSpinner(false));
            dispatch(setMode(ServiceModes.PriceListUI));
            return;
        }).catch((err) => {
            console.log(err);
            dispatch(outInfo({
                isSuccess: false,
                text: err.response.data.Description,
            }));
            dispatch(setSpinner(false));
        })
    }

    const setValueItem = (index: number, value: string) => {
        values[index] = value;
        setValues([...values]);
    }

    return (
        <>
            <MyStackBetween>
                <MyButton text='назад к списку' onClick={returnBack} />
            </MyStackBetween>

            <MyStackBetween>
                <Typography variant="h5" paddingLeft={6}>{price.name} - Добавление новой позиции</Typography>
                <MyButton text='добавить позицию' onClick={addNewPriceListItem} />
            </MyStackBetween>

            <MyTextFild title="Название позиции" value={values[0]} onChange={(v) => setValueItem(0, v)} />
            <MyNumberFild title="Артикул" value={values[1]} onChange={(v) => setValueItem(1, v)} />

            <TableContainer component={Paper}>
                <Table aria-label="customized  table">

                    <MyTableHead
                        columns={['КОЛОНКА', 'ТИП ДАННЫХ', 'ЗНАЧЕНИЕ']}
                        columnWidths={['260px', '120', 'auto']}
                    />

                    <TableBody>
                        {price.columns && price.columns.slice(2).map((column, index) => (
                            <TableRow
                            key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                hover={true}
                            >
                                <TableCell align="left">
                                    <Typography>
                                        {column.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography>
                                        {column.dataType === DataTypes.String && 'строка'}
                                        {column.dataType === DataTypes.Number && 'число'}
                                        {column.dataType === DataTypes.Text && 'текст'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    {column.dataType === DataTypes.String &&
                                        <MyTextFildWithoutLabel value={values[index + 2]} onChange={(v) => setValueItem(index + 2, v)} />}
                                    {column.dataType === DataTypes.Number &&
                                        <MyNumberFildWithoutLabel value={values[index + 2]} onChange={(v) => setValueItem(index + 2, v)} />}
                                    {column.dataType === DataTypes.Text &&
                                        <MyTextFildWithoutLabelMultiline value={values[index + 2]} onChange={(v) => setValueItem(index + 2, v)} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}

export default AddPriceListItemUI;