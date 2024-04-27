import { configureStore, combineSlices } from "@reduxjs/toolkit"
import { heroSlice } from "../features/hero/heroSlice"

const rootReducer = combineSlices(heroSlice)
export const store = configureStore({
  reducer: {
    hero: rootReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
