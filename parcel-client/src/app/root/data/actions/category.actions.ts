import { createAction, props } from '@ngrx/store';
import { CategoriesResult } from 'src/app/models/categories';

export const LoadCategoryActionType = '[Category List] Load Categories';
export const CategoryLoadSuccessActionType = '[Category API] Load Category Success';
export const CategoryLoadFailureActionType = '[Category API] Load Category Failed';

export const loadCategories = createAction(LoadCategoryActionType);
export const loadCategorySuccess = createAction(CategoryLoadSuccessActionType, props<CategoriesResult>());
export const loadCategoryFailure = createAction(CategoryLoadFailureActionType);
export type CatergoryActions = ReturnType<typeof loadCategories> | ReturnType<typeof loadCategorySuccess> | ReturnType<typeof loadCategoryFailure>;
