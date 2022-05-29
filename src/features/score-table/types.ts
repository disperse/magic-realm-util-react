import type { Category } from '../../types/Category';

export interface Column {
    field?: keyof Category
    headerName: string
    width: number
    editable?: boolean
    valueGetter: (cat: Category) => string | number
    totalGetter?: (cats: Array<Category>) => string | number
}

export interface Patch {
    points: number
    recorded: number
    owned: number
}

export interface SetField {
    categoryIndex: number
    field: string
    value: number
}
