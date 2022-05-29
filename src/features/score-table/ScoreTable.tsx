import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
    calcNeeded,
    calcScore,
    calcBasicScore,
    calcBonusScore,
    calcFinalScore, Category
} from "../../types/Category";
import { useAppSelector } from "../../store/hooks";

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Category',
        width: 180
    },
    {
        field: 'points',
        headerName: 'Points',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'multiplier',
        headerName: '',
        width: 140,
        valueGetter: (params: GridValueGetterParams) =>
            `times ${params.row.multiplier}`,
    },
    {
        field: 'needed',
        headerName: 'Needed',
        type: 'number',
        width: 100,
        valueGetter: (params: GridValueGetterParams) =>
            calcNeeded(params.row.points, params.row),
    },
    {
        field: 'recorded',
        headerName: 'Recorded',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'owned',
        headerName: 'Owned',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'total',
        headerName: 'Total',
        type: 'number',
        width: 80,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.recorded + params.row.owned,
    },
    {
        field: 'score',
        headerName: 'Score',
        type: 'number',
        width: 80,
        valueGetter: (params: GridValueGetterParams) =>
            calcScore(params.row.points, params.row),
    },
    {
        field: 'basic',
        headerName: 'Basic',
        type: 'number',
        width: 80,
        valueGetter: (params: GridValueGetterParams) =>
            calcBasicScore(params.row.points, params.row),
    },
    {
        field: 'bonus',
        headerName: 'Bonus',
        type: 'number',
        width: 80,
        valueGetter: (params: GridValueGetterParams) =>
            calcBonusScore(params.row.points, params.row),
    },
    {
        field: 'final',
        headerName: 'Final',
        type: 'number',
        width: 80,
        valueGetter: (params: GridValueGetterParams) =>
            calcFinalScore(params.row.points, params.row),
    },
];

export function ScoreTable() {
    const categories: Array<Category> = useAppSelector(state => state.store.categories);
    
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row.name}
                rows={categories}
                columns={columns}
                autoHeight={true}
            />
        </div>
    )
}
