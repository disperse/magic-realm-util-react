import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, createCategory } from '../../types/Category';
import { Patch, SetField } from './types';

interface ScoreTableState {
    categories: Array<Category>,
    pointsArray: Array<Array<number>>,
    tortureTest: boolean
}

const initialState: ScoreTableState = {
  categories: [
    createCategory('Great Treasures', 1, false, true),
    createCategory('Spells', 2),
    createCategory('Fame', 10, true, true),
    createCategory('Notoriety', 20, true, true),
    createCategory('Gold', 30, true, true),
  ],
  pointsArray: [],
  tortureTest: false,
};

const scoreTableSlice = createSlice({
  name: 'scoreTable',
  initialState,
  reducers: {
    addPoints: (state, action) => {
      state.pointsArray.push(action.payload);
    },
    setField: (state, action: PayloadAction<SetField>) => {
      const cat = state.categories[action.payload.categoryIndex];
      switch (action.payload.field) {
        case 'points':
          cat.points = action.payload.value;
          break;
        case 'recorded':
          cat.recorded = action.payload.value;
          break;
        case 'owned':
          cat.owned = action.payload.value;
          break;
        default:
          // do nothing
      }
    },
    patchCategories: (state, action: PayloadAction<Array<Patch>>) => {
      action.payload.forEach((patch, index) => {
        const cat = state.categories[index];
        state.categories[index].points = patch.points;
        if (cat.hasRecorded) {
          state.categories[index].recorded = Math.floor(patch.recorded * cat.multiplier);
        }
        if (cat.hasOwned) {
          state.categories[index].owned = Math.floor(patch.owned * cat.multiplier);
        }
      });
    },
  },
});

export const { addPoints, patchCategories, setField } = scoreTableSlice.actions;

export default scoreTableSlice.reducer;
