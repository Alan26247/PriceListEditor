import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnItem } from 'entities/ColumnItem';

export interface PriceListState {
  id: number | null,
  name: string | null,
  columns: ColumnItem[] | null,
}

const initialState: PriceListState = {
  id: null,
  name: null,
  columns: null,
}

export const priceListSlice = createSlice({
  name: 'price_list',
  initialState,
  reducers: {
    setPriceListId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    setPriceListName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setPriceListColumns: (state, action: PayloadAction<ColumnItem[] | null>) => {
      state.columns = action.payload;
    },
  },
})

export const { setPriceListId, setPriceListName, setPriceListColumns } = priceListSlice.actions

export default priceListSlice.reducer