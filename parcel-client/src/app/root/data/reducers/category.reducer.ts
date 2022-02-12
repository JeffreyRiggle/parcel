import { Action, createReducer, on } from '@ngrx/store';
import { ActionType } from '@ngrx/store/src/models';
import { CategoriesResult } from 'src/app/models/categories';
import { loadCategories, loadCategoryFailure, loadCategorySuccess } from '../actions/category.actions';

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

export function categoryReducer(state: CategoryState | undefined, action: Action | ActionType<CategoriesResult>) {
    return reducer(state, action);
}
