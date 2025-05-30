import { configureStore } from '@reduxjs/toolkit'
import tarefasReducer from './ reducers/tarefas'

const store = configureStore({
  reducer: {
    tarefas: tarefasReducer
  }
})

export type RootState = ReturnType<typeof store.getState> // <-- This must be here
export default store
