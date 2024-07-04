import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServiceModes } from 'shared/enums/ServiceModes';

export interface ModeState {
  mode: ServiceModes,
}

const initialState: ModeState = {
    mode: ServiceModes.PriceListArrayUI,
}

export const modeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ServiceModes>) => {
      state.mode = action.payload;
    },
  },
})

export const { setMode } = modeSlice.actions

export default modeSlice.reducer