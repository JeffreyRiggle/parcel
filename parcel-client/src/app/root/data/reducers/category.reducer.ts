import { createReducer, on } from '@ngrx/store';
import { CategoriesResult } from 'src/app/models/categories';
import { CatergoryActions, loadCategories, loadCategoryFailure, loadCategorySuccess } from '../actions/category.actions';

export interface CategoryState {
    categories: string[];
    loadingCategories: boolean;
    error: boolean;
}

export const initialState = {
    categories: [] as string[],
    loadingCategories: false,
    error: false,
};

const reducer = createReducer(
    initialState,
    on(loadCategories, (state: CategoryState) => ({ ...state, loadingCategories: true, error: false })),
    on(loadCategorySuccess, (state: CategoryState, props: CategoriesResult) => ({ ...state, loadingCategories: false, categories: props.results })),
    on(loadCategoryFailure, (state: CategoryState) => ({ ...state, loadingCategories: false, error: true }))
);

export function categoryReducer(state: CategoryState | undefined, action: CatergoryActions) {
    return reducer(state, action);
}
