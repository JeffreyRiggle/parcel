import { createAction, props } from '@ngrx/store';
import { AppsResult } from 'src/app/models/apps';

export const LoadAppsByCategoryActionType = '[Apps] Load Apps By Categories';
export const AppsByCategoryLoadSuccessActionType = '[Apps API] Load App By Category Success';
export const AppsByCategoryLoadFailureActionType = '[Apps API] Load App By Category Failed';

export const loadAppsByCategory = createAction(LoadAppsByCategoryActionType, props<{ category: string }>());
export const loadAppsByCategorySuccess = createAction(AppsByCategoryLoadSuccessActionType, props<AppsResult>());
export const loadAppsByCategoryFailure = createAction(AppsByCategoryLoadFailureActionType, props<{ category: string }>());
export type AppActions = ReturnType<typeof loadAppsByCategory> | ReturnType<typeof loadAppsByCategorySuccess> | ReturnType<typeof loadAppsByCategoryFailure>;
