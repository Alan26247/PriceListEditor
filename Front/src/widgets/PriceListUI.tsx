import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextareaAutosize, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { getPriceListById } from "shared/api/PriceList";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { PriceList } from 'entities/PriceList';
import { GetPriceListItemArray, getPriceListItemArray } from 'shared/api/PriceListItem';
import { setPriceListColumns, setPriceListId } from 'app/stores/priceListSlice';
import ModalDeletePriceListItemUI from 'features/Modals/PriceListItem/ModalDeletePriceListItemUI';
import { PriceListItemArray } from 'entities/PriceListItemArray';
import PaginationUI from 'widgets/PaginationUI';
import { ServiceModes } from 'shared/enums/ServiceModes';
import { setMode } from 'app/stores/modeSlice';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { DataTypes } from 'shared/enums/DataTypes';
import MyPaginationCountSelect from 'components/Inputs/MyPaginationCountSelect';
import MyFindFild from 'components/Inputs/MyFindFild';
import MyButton from 'components/MyTextFild';
import MyStackBetween from 'components/Stack/MyStackBetween';

const PriceListUI = () => {

  const dispatch = useDispatch();

  const price = useSelector((state: RootState) => state.price);

  let [currentPriceList, setCurrentPriceList] = useState<PriceList | null>(null);

  let [getPriceListItemArrayData, setGetPriceListItemArrayData] = useState<GetPriceListItemArray>(new GetPriceListItemArray());
  const [currentPriceListItemArray, setCurrentPriceListItemArray] = useState<PriceListItemArray | null>(null);

  const [currentPriceListItemId, setCurrentPriceListItemId] = useState<number>(0);
  const [currentPriceListItemName, setCurrentPriceListItemName] = useState<string>('');
  const [openWindowForDelete, setOpenWindowForDelete] = useState<boolean>(false);

  const returnBack = () => {
    dispatch(setPriceListId(null));
    dispatch(setMode(ServiceModes.PriceListArrayUI));
  }

  useEffect(() => {
    updateCurrentPriceList();
  }, []);

  const updateCurrentPriceList = () => {
    getPriceListById(price.id as number)
      .then((res) => {
        setCurrentPriceList(res.data.data);
        dispatch(setPriceListColumns(res.data.data.columns));
        updateDataGetPriceListItemArray(getPriceListItemArrayData);
        return;
      }
      )
  }

  const updateDataGetPriceListItemArray = (
    data: GetPriceListItemArray
  ) => {
    data.PriceListId = price.id as number;
    getPriceListItemArray(data)
      .then((res) => {
        setCurrentPriceListItemArray(res.data.data);
        return;
      }
      )
  }

  const updateFindString = (value: string) => {
    getPriceListItemArrayData.FindString = value;
    updateDataGetPriceListItemArray(getPriceListItemArrayData);
    setGetPriceListItemArrayData(getPriceListItemArrayData);
  }

  const changeSorting = (columnIndex: number, isAscending: boolean) => {
    getPriceListItemArrayData.SortingColumnIndex = columnIndex;
    getPriceListItemArrayData.SortingIsAscending = isAscending;
    updateDataGetPriceListItemArray(getPriceListItemArrayData);
    setGetPriceListItemArrayData(getPriceListItemArrayData);
  }

  const changePage = (pageNumber: number) => {
    getPriceListItemArrayData.PageNumber = pageNumber;
    updateDataGetPriceListItemArray(getPriceListItemArrayData);
    setGetPriceListItemArrayData(getPriceListItemArrayData);
  }

  const changePageSize = (pageSize: number) => {
    getPriceListItemArrayData.PageNumber = 1;
    getPriceListItemArrayData.PageSize = pageSize;
    updateDataGetPriceListItemArray(getPriceListItemArrayData);
    setGetPriceListItemArrayData(getPriceListItemArrayData);
  }

  const deletePriceListItem = (id: number, name: string) => {
    setCurrentPriceListItemId(id);
    setCurrentPriceListItemName(name);
    setOpenWindowForDelete(true);
  }

  const AddPriceListItem = () => {
    dispatch(setMode(ServiceModes.AddPriceListItemUI));
  }

  return (
    <>
      <MyStackBetween>
        <MyButton text='назад к списку' onClick={returnBack} />
      </MyStackBetween>

      <MyStackBetween>
        <Typography variant="h5">{currentPriceList?.name}</Typography>
        <MyFindFild value={getPriceListItemArrayData.FindString} onChange={updateFindString} />
        <MyPaginationCountSelect
          value={getPriceListItemArrayData.PageSize}
          onChange={(value) => changePageSize(value)} />
        <MyButton text='добавить позицию' onClick={AddPriceListItem} />
      </MyStackBetween>

      <Divider />

      {currentPriceList && currentPriceListItemArray &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, marginTop: 0 }} aria-label="customized  table">

            <TableHead sx={{ backgroundColor: '#dff3eea3' }}>
              <TableRow>
                {currentPriceList.columns.map((column, index) => (
                  <TableCell
                    key={column.name}
                    align="left"
                    onClick={(e) => changeSorting(index, !getPriceListItemArrayData.SortingIsAscending)}
                    sx={{ cursor: 'pointer', ":hover": { backgroundColor: '#c8e6f8' } }}
                  >
                    <Stack direction={'row'} gap={1} alignItems={'left'}>
                      <Typography>{column.name}</Typography>
                      {getPriceListItemArrayData.SortingColumnIndex === index &&
                        !getPriceListItemArrayData.SortingIsAscending && <ArrowDropUpIcon />}
                      {getPriceListItemArrayData.SortingColumnIndex === index &&
                        getPriceListItemArrayData.SortingIsAscending && <ArrowDropDownIcon />}
                      {getPriceListItemArrayData.SortingColumnIndex !== index && <RemoveIcon />}
                    </Stack>
                  </TableCell>)
                )}
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentPriceListItemArray.data.map((priceListItem) => (
                <TableRow
                  key={priceListItem.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover={true}
                >
                  {priceListItem.values.map((value, index) => (
                    <TableCell key={index} align="left" style={{ verticalAlign: 'top' }}>
                      {currentPriceList &&
                        <>
                          {currentPriceList.columns[index].dataType === DataTypes.String && <Typography>{value}</Typography>}
                          {currentPriceList.columns[index].dataType === DataTypes.Number && <Typography>{value}</Typography>}
                          {currentPriceList.columns[index].dataType === DataTypes.Text &&
                            <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
                          }
                        </>
                      }
                    </TableCell>
                  ))}
                  <TableCell align="left">
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      width={'100%'}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button onClick={() => deletePriceListItem(priceListItem.id, priceListItem.values[0])}>
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      }

      {currentPriceListItemArray && (
        <PaginationUI
          page={getPriceListItemArrayData.PageNumber}
          pageCount={currentPriceListItemArray?.pageCount}
          onChange={(value: number) => changePage(value)}
        />
      )}

      {openWindowForDelete &&
        <ModalDeletePriceListItemUI
          priceListItemId={currentPriceListItemId as number}
          name={currentPriceListItemName}
          onClose={() => setOpenWindowForDelete(false)}
          onDelete={() => updateDataGetPriceListItemArray(getPriceListItemArrayData)} />
      }
    </>
  );
}

export default PriceListUI;