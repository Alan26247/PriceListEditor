import { useEffect, useState } from "react";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";
import { setPriceListId, setPriceListName } from "app/stores/priceListSlice";
import CloseIcon from '@mui/icons-material/Close';
import { GetPriceListArray, getPriceListArray } from "shared/api/PriceList";
import PaginationUI from "widgets/PaginationUI";
import { PriceListArray } from "entities/PriceListArray";
import { ServiceModes } from "shared/enums/ServiceModes";
import { setMode } from "app/stores/modeSlice";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RemoveIcon from '@mui/icons-material/Remove';
import MyPaginationCountSelect from "components/Inputs/MyPaginationCountSelect";
import MyFindFild from "components/Inputs/MyFindFild";
import MyButton from "components/MyTextFild";
import MyStackBetween from "components/Stack/MyStackBetween";

const PriceListArrayUI = () => {

  const dispatch = useDispatch();

  let [dataGetPriceListArray, setDataGetPriceListArray] = useState<GetPriceListArray>(new GetPriceListArray());
  const [priceListArray, setSetPriceListArray] = useState<PriceListArray | null>(null);

  useEffect(() => {
    updatePriceListArray(dataGetPriceListArray);
  }, []);

  const updatePriceListArray = (
    data: GetPriceListArray
  ) => {
    getPriceListArray(data)
      .then((res) => {
        setSetPriceListArray(res.data.data);
        return;
      }
      )
  }

  const updateFindString = (value: string) => {
    dataGetPriceListArray.FindString = value;
    updatePriceListArray(dataGetPriceListArray);
    setDataGetPriceListArray(dataGetPriceListArray);
  }

  const changeSorting = (columnIndex: number, isAscending: boolean) => {
    dataGetPriceListArray.SortingColumnIndex = columnIndex;
    dataGetPriceListArray.SortingIsAscending = isAscending;
    updatePriceListArray(dataGetPriceListArray);
    setDataGetPriceListArray(dataGetPriceListArray);
  }

  const changePage = (pageNumber: number) => {
    dataGetPriceListArray.PageNumber = pageNumber;
    updatePriceListArray(dataGetPriceListArray);
    setDataGetPriceListArray(dataGetPriceListArray);
  }

  const changePageSize = (pageSize: number) => {
    dataGetPriceListArray.PageNumber = 1;
    dataGetPriceListArray.PageSize = pageSize;
    updatePriceListArray(dataGetPriceListArray);
    setDataGetPriceListArray(dataGetPriceListArray);
  }

  const AddPriceList = () => {
    dispatch(setMode(ServiceModes.AddPriceListUI));
  }

  const changeCurrentPriceList = (id: number, name: string) => {
    dispatch(setPriceListId(id));
    dispatch(setPriceListName(name));
    dispatch(setMode(ServiceModes.PriceListUI));
  }

  return (
    <>
      <MyStackBetween>
        <Typography variant="h5">ПРАЙС ЛИСТЫ</Typography>
        <MyFindFild value={dataGetPriceListArray.FindString} onChange={updateFindString} />
        <MyPaginationCountSelect
          value={dataGetPriceListArray.PageSize}
          onChange={(value) => changePageSize(value)} />
        <MyButton text='создать прайс лист' onClick={AddPriceList} />
      </MyStackBetween>

      <Divider />

      {priceListArray &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, marginTop: 0 }} aria-label="customized  table">

            <TableHead sx={{ backgroundColor: '#dff3eea3' }}>
              <TableRow>

                <TableCell
                  align="center"
                  width={120}
                  onClick={(e) => changeSorting(0, !dataGetPriceListArray.SortingIsAscending)}
                  sx={{ cursor: 'pointer', ":hover": { backgroundColor: '#c8e6f8' } }}
                >
                  <Stack direction={'row'} gap={1} justifyContent={'center'} alignItems={'left'}>
                    <Typography>№</Typography>
                    {dataGetPriceListArray.SortingColumnIndex === 0 &&
                      !dataGetPriceListArray.SortingIsAscending && <ArrowDropUpIcon />}
                    {dataGetPriceListArray.SortingColumnIndex === 0 &&
                      dataGetPriceListArray.SortingIsAscending && <ArrowDropDownIcon />}
                    {dataGetPriceListArray.SortingColumnIndex !== 0 && <RemoveIcon />}
                  </Stack>
                </TableCell>

                <TableCell
                  align="left"
                  onClick={(e) => changeSorting(1, !dataGetPriceListArray.SortingIsAscending)}
                  sx={{ cursor: 'pointer', ":hover": { backgroundColor: '#c8e6f8' } }}
                >
                  <Stack direction={'row'} gap={1} alignItems={'left'}>
                    <Typography>НАЗВАНИЕ</Typography>
                    {dataGetPriceListArray.SortingColumnIndex === 1 &&
                      !dataGetPriceListArray.SortingIsAscending && <ArrowDropUpIcon />}
                    {dataGetPriceListArray.SortingColumnIndex === 1 &&
                      dataGetPriceListArray.SortingIsAscending && <ArrowDropDownIcon />}
                    {dataGetPriceListArray.SortingColumnIndex !== 1 && <RemoveIcon />}
                  </Stack>
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {priceListArray.data.map((priceList) => (
                <TableRow
                  key={priceList.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => changeCurrentPriceList(priceList.id, priceList.name)}
                  style={{ cursor: 'pointer' }}
                  hover={true}
                >
                  <TableCell component="th" scope="row" align="center">
                    <Typography>{priceList.id}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{priceList.name}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      }
      {priceListArray && (
        <PaginationUI
          page={dataGetPriceListArray.PageNumber}
          pageCount={priceListArray?.pageCount}
          onChange={(value: number) => changePage(value)}
        />
      )}
    </>
  );
}

export default PriceListArrayUI;