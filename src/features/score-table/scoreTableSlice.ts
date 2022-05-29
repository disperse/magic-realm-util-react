import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../../store/store';
import { Category } from "../../types/Category";
import combinations from "../../functions/combinations";

interface ScoreTableState {
    categories: Array<Category>,
    pointsArray: Array<Array<number>>,
    generator: Generator,
    tortureTest: boolean
}

const initialState: ScoreTableState = {
    categories: [
        new Category("Great Treasures", 1, true, false),
        new Category("Spells", 2),
        new Category("Fame", 10, true),
        new Category("Notoriety", 20, true),
        new Category("Gold", 30, true),
    ],
    pointsArray: [[0, 0, 0, 0, 0]],
    generator: combinations([0, 1, 2, 3, 4, 5], 5),
    tortureTest: false,
}

const scoreTableSlice = createSlice({
    name: 'scoreTable',
    initialState,
    reducers: {
        setPoints: (state, action) => {
            state.pointsArray[0] = action.payload;
        },
        addPoints: (state, action) => {
            state.pointsArray.push(action.payload);
        },
    }
});

export const { addPoints } = scoreTableSlice.actions;

export default scoreTableSlice.reducer;