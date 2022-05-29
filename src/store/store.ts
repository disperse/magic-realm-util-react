import { configureStore } from '@reduxjs/toolkit';
import scoreTableSlice from '../features/score-table/scoreTableSlice';

export const store = configureStore({
    reducer: {
        store: scoreTableSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;