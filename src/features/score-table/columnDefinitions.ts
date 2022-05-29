import {
  calcBasicScore,
  calcBonusScore,
  calcFinalScore,
  calcNeeded,
  calcScore,
  Category,
} from '../../types/Category';

import { Column } from './scoreTableTypes';

const columns: Array<Column> = [
  {
    headerName: 'Category',
    width: 180,
    valueGetter: (cat: Category) => cat.name,
    totalGetter: () => 'Total',
  },
  {
    field: 'points',
    headerName: 'Points',
    width: 80,
    editable: true,
    valueGetter: (cat: Category) => cat.points,
    totalGetter: (cat: Array<Category>) => cat.reduce((pv, cv) => pv + cv.points, 0),
  },
  {
    headerName: '',
    width: 140,
    valueGetter: (cat: Category) => `times ${cat.multiplier}`,
  },
  {
    headerName: 'Needed',
    width: 100,
    valueGetter: (cat: Category) => calcNeeded(cat.points, cat),
  },
  {
    field: 'recorded',
    headerName: 'Recorded',
    width: 120,
    editable: true,
    valueGetter: (cat: Category) => cat.recorded,
  },
  {
    field: 'owned',
    headerName: 'Owned',
    width: 80,
    editable: true,
    valueGetter: (cat: Category) => cat.owned,
  },
  {
    headerName: 'Total',
    width: 80,
    valueGetter: (cat: Category) => cat.recorded + cat.owned,
  },
  {
    headerName: 'Score',
    width: 80,
    valueGetter: (cat: Category) => calcScore(cat.points, cat),
  },
  {
    headerName: 'Basic',
    width: 80,
    valueGetter: (cat: Category) => calcBasicScore(cat.points, cat),
    totalGetter: (cat: Array<Category>) =>
      cat.reduce((pv, cv) => pv + calcBasicScore(cv.points, cv), 0),
  },
  {
    headerName: 'Bonus',
    width: 80,
    valueGetter: (cat: Category) => calcBonusScore(cat.points, cat),
    totalGetter: (cat: Array<Category>) =>
      cat.reduce((pv, cv) => pv + calcBonusScore(cv.points, cv), 0),
  },
  {
    headerName: 'Final',
    width: 80,
    valueGetter: (cat: Category) => calcFinalScore(cat.points, cat),
    totalGetter: (cat: Array<Category>) =>
      cat.reduce((pv, cv) => pv + calcFinalScore(cv.points, cv), 0),
  },
];

export default columns;
