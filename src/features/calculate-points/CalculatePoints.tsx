import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import { TableSortLabel } from '@mui/material';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { calcFinalScore, Category } from '../../types/Category';
import combinations from '../../functions/combinations';
import { addPoints } from '../score-table/slice';

const generator = combinations([0, 1, 2, 3, 4, 5], 5);

const totalFinalScore = (arr: Array<number>, cats: Array<Category>) =>
  cats.reduce((pv, cv, index) => pv + calcFinalScore(arr[index], cv), 0);

export default function CalculatePoints() {
  type Order = 'asc' | 'desc';
  const [sortFinal, setSortFinal] = React.useState<Order>('desc');
  const categories: Array<Category> = useAppSelector((state: RootState) => state.store.categories);
  const pointsArray: Array<Array<number>> = useAppSelector(
    (state: RootState) => state.store.pointsArray,
  ).map((arr) => [...arr, totalFinalScore(arr, categories)]);
  const dispatch = useAppDispatch();

  const cellKey = (index: number, arr: Array<number>) => `${(index === 5) ? 'total' : categories[index].name}-${arr.join}`;

  const calculateNext = () => {
    const next = generator.next();
    if (!next.done) {
      dispatch(addPoints(next.value));
    }
  };

  const calculateAll = () => {
    let go = true;
    do {
      const next = generator.next();
      if (!next.done) {
        dispatch(addPoints(next.value));
      }
      go = !next.done;
    } while (go);
  };

  const clickSort = () => {
    setSortFinal((sortFinal === 'asc') ? 'desc' : 'asc');
  };

  const finalSorter = (a: Array<number>, b: Array<number>) => {
    if (a.length < 6 || b.length < 6) return 0;
    return (sortFinal === 'asc') ? a[5] - b[5] : b[5] - a[5];
  };

  return (
    <div style={{ width: '100%', marginTop: '2em' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}>
                <Button
                  variant="contained"
                  onClick={calculateNext}
                >
                  Calculate next
                </Button>
                <Button
                  style={{ marginLeft: '1em' }}
                  variant="contained"
                  onClick={calculateAll}
                >
                  Calculate all
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              {categories.map((cat) => (
                <TableCell key={cat.name}>{cat.name}</TableCell>
              ))}
              <TableCell
                key="Final"
                onClick={clickSort}
              >
                <TableSortLabel
                  active
                  direction={sortFinal}
                >
                  Final
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...pointsArray]
              .sort(finalSorter)
              .map((arr) => (
                <TableRow
                  key={arr.join()}
                >
                  {arr.map((score, index) => (
                    <TableCell key={cellKey(index, arr)}>{score}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
