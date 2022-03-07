import { createReducer, on } from '@ngrx/store';
import { AppMetaData, AppsResult } from 'src/app/models/apps';
import { AppActions, loadAppsByCategory, loadAppsByCategoryFailure, loadAppsByCategorySuccess } from '../actions/app.actions';

interface LoadingState {
    category: { [id: string]: boolean }
}
export interface AppsState {
    apps: AppMetaData[];
    loading: LoadingState;
    error: boolean;
}

export const initialState = {
    apps: [] as AppMetaData[],
    loading: {} as LoadingState,
    error: false,
};

const reducer = createReducer(
    initialState,
    on(loadAppsByCategory, (state: AppsState, props: { category: string }) => ({ ...state, loading: { ...state.loading, [props.category]: true }, error: false })),
    on(loadAppsByCategorySuccess, (state: AppsState, props: AppsResult) => ({ ...state, loadingCategories: false, apps: props.results })),
    on(loadAppsByCategoryFailure, (state: AppsState, props: { category: string }) => ({ ...state, loading: { ...state.loading, [props.category]: false }, error: true }))
);

export function appsReducer(state: AppsState | undefined, action: AppActions) {
    return reducer(state, action);
}
