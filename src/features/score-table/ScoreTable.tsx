import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    calcNeeded,
    calcScore,
    calcBasicScore,
    calcBonusScore,
    calcFinalScore, Category
} from "../../types/Category";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { patchCategories } from "./scoreTableSlice";

interface Column {
    headerName: string
    width: number
    editable?: boolean
    valueGetter: (cat: Category) => string | number
    totalGetter?: (cat: Array<Category>) => string | number
}

export interface Patch {
    points: number
    recorded: number
    owned: number
}

const columns: Array<Column> = [
    {
        headerName: "Category",
        width: 180,
        valueGetter: (cat: Category) => cat.name,
        totalGetter: () => `Total`
    },
    {
        headerName: "Points",
        width: 80,
        editable: true,
        valueGetter: (cat: Category) => cat.points,
        totalGetter: (cat: Array<Category>) =>
            cat.reduce((pv, cv) => pv + cv.points, 0)
    },
    {
        headerName: "",
        width: 140,
        valueGetter: (cat: Category) =>
            `times ${cat.multiplier}`,
    },
    {
        headerName: "Needed",
        width: 100,
        valueGetter: (cat: Category) =>
            calcNeeded(cat.points, cat),
    },
    {
        headerName: "Recorded",
        width: 120,
        editable: true,
        valueGetter: (cat: Category) => cat.recorded,
    },
    {
        headerName: "Owned",
        width: 80,
        editable: true,
        valueGetter: (cat: Category) => cat.owned,
    },
    {
        headerName: "Total",
        width: 80,
        valueGetter: (cat: Category) =>
            cat.recorded + cat.owned,
    },
    {
        headerName: "Score",
        width: 80,
        valueGetter: (cat: Category) =>
            calcScore(cat.points, cat),
    },
    {
        headerName: "Basic",
        width: 80,
        valueGetter: (cat: Category) =>
            calcBasicScore(cat.points, cat),
        totalGetter: (cat: Array<Category>) =>
            cat.reduce((pv, cv) => pv + calcBasicScore(cv.points, cv), 0)
    },
    {
        headerName: "Bonus",
        width: 80,
        valueGetter: (cat: Category) =>
            calcBonusScore(cat.points, cat),
        totalGetter: (cat: Array<Category>) =>
            cat.reduce((pv, cv) => pv + calcBonusScore(cv.points, cv), 0)
    },
    {
        headerName: "Final",
        width: 80,
        valueGetter: (cat: Category) =>
            calcFinalScore(cat.points, cat),
        totalGetter: (cat: Array<Category>) =>
            cat.reduce((pv, cv) => pv + calcFinalScore(cv.points, cv), 0)
    },
];

export function ScoreTable() {
    const categories: Array<Category> = useAppSelector(state => state.store.categories);
    const dispatch = useAppDispatch();
    const randomize = () => {
        const patches: Array<Patch> = [];
        let remaining = 5;
        categories
            .forEach((category, index) => {
                const patch: Patch = { points: 0, owned: 0, recorded: 0 }; 
                const points = (index == categories.length - 1) ? 
                    remaining :
                    Math.floor(Math.random() * (remaining + 1));
                patch.points = points;
                remaining -= points;
                patch.owned = Math.random() * 8 - 2;
                patch.recorded = Math.random() * 8 - 2;
                patches.push(patch);
            });
        patches.sort((a, b) => (Math.random() < 0.5) ? 1 : -1);
        dispatch(patchCategories(patches));
    }
    
    const getTableCell = (column: Column, cat: Category) => {
        const value = column.valueGetter(cat);
        return (
            <TableCell>
                {
                    (column.editable) ?
                        <input type="number" min="-999" max="999" value={value} /> :
                        <span>{value}</span>
                }
            </TableCell>
        )}

    return (
        <div style={{ height: 400, width: "100%" }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={11}>
                                <Button
                                    variant="contained"
                                    onClick={randomize}
                                >Random</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell>{column.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow
                              key={cat.name}
                            >
                                {columns.map((column) => (
                                    getTableCell(column, cat)
                                ))}
                            </TableRow>
                            
                        ))}
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell component="th">
                                    {(column.totalGetter) ?
                                        column.totalGetter(categories) : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
