import { Action, createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';

export interface LoginState {
    loginPending: boolean;
    error: boolean;
}

export const initialState = {
    loginPending: false,
    error: false,
};

const reducer = createReducer(
    initialState,
    on(login, (state: LoginState) => ({ ...state, loginPending: true, error: false })),
    on(loginSuccess, (state: LoginState) => ({ ...state, loginPending: false })),
    on(loginFailure, (state: LoginState) => ({ ...state, loginPending: false, error: true }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    return reducer(state, action);
}
