import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, createCategory } from "../../types/Category";
import combinations from "../../functions/combinations";
import { Patch } from "./ScoreTable";

interface ScoreTableState {
    categories: Array<Category>,
    pointsArray: Array<Array<number>>,
    tortureTest: boolean
}

const generator = combinations([0, 1, 2, 3, 4, 5], 5);

const initialState: ScoreTableState = {
    categories: [
        createCategory("Great Treasures", 1, false, true),
        createCategory("Spells", 2),
        createCategory("Fame", 10, true, true),
        createCategory("Notoriety", 20, true, true),
        createCategory("Gold", 30, true, true),
    ],
    pointsArray: [[0, 0, 0, 0, 0]],
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
        patchCategories: (state, action: PayloadAction<Array<Patch>>) => {
            action.payload.forEach((patch, index) => {
                let cat = state.categories[index];
                state.categories[index].points = patch.points;
                if (cat.hasRecorded) {
                    state.categories[index].recorded = Math.floor(patch.recorded * cat.multiplier);
                }
                if (cat.hasOwned) {
                    state.categories[index].owned = Math.floor(patch.owned * cat.multiplier);
                }
            });
        }
    }
});

export const { patchCategories } = scoreTableSlice.actions;

export default scoreTableSlice.reducer;