import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../reducers/tasksSlice';
import listsReducer from '../reducers/listsSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch