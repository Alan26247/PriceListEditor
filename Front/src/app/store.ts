import { configureStore } from '@reduxjs/toolkit'
import infoReducer from 'app/stores/infoSlice'
import spinnerReducer from 'app/stores/spinnerSlice'
import priceListReducer from 'app/stores/priceListSlice'
import modeReducer from 'app/stores/modeSlice'

export const store = configureStore({
  reducer: {
    info: infoReducer,
    spinner: spinnerReducer,
    price: priceListReducer,
    mode: modeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch