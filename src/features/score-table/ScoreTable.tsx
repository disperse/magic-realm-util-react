import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ChangeEventHandler } from 'react';
import { Category } from '../../types/Category';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { patchCategories, setField } from './slice';
import { Patch, Column } from './types';
import columns from './columns';
import { getRandomPatches } from './functions';
import { RootState } from '../../store/store';

interface ScoreTableCellProps {
  column: Column
  cat: Category
  onChange: ChangeEventHandler<HTMLInputElement>
}

function ScoreTableCell(props: ScoreTableCellProps) {
  const { column, cat, onChange } = props;
  const value = column.valueGetter(cat);
  return (
    <TableCell>
      {
        (column.editable)
          ? (
            <input
              name={column.field}
              type="number"
              min="-999"
              max="999"
              value={value}
              onChange={onChange}
            />
          )
          : <span>{value}</span>
        }
    </TableCell>
  );
}

export default function ScoreTable() {
  const categories: Array<Category> = useAppSelector((state: RootState) => state.store.categories);
  const dispatch = useAppDispatch();

  /* Actions */
  const changeValue = (categoryIndex: number) => (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setField({
      categoryIndex,
      value: Number.parseInt(event.currentTarget.value, 10),
      field: event.currentTarget.name,
    }));
  };

  const randomize = () => {
    const patches: Array<Patch> = getRandomPatches(categories);
    dispatch(patchCategories(patches));
  };

  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={11}>
                <Button
                  variant="contained"
                  onClick={randomize}
                >
                  Random
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.headerName}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat, index) => (
              <TableRow
                key={cat.name}
              >
                {columns.map((column) => (
                  <ScoreTableCell
                    key={`${column.headerName}-${cat.name}`}
                    column={column}
                    cat={cat}
                    onChange={changeValue(index)}
                  />
                ))}
              </TableRow>

            ))}
            <TableRow>
              {columns.map((column) => (
                <TableCell component="th" key={`total-${column.headerName}`}>
                  {(column.totalGetter)
                    ? column.totalGetter(categories) : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
