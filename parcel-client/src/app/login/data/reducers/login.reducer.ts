import { Action, createReducer, on } from '@ngrx/store';
import { login, LoginActions, loginFailure, loginSuccess } from '../actions/login.actions';

export interface LoginState {
    loginPending: boolean;
    error: boolean;
    success: boolean;
}

export const initialState = {
    loginPending: false,
    error: false,
    success: false,
};

const reducer = createReducer(
    initialState,
    on(login, (state: LoginState) => ({ ...state, loginPending: true, error: false, success: false })),
    on(loginSuccess, (state: LoginState) => ({ ...state, loginPending: false, success: true })),
    on(loginFailure, (state: LoginState) => ({ ...state, loginPending: false, error: true, success: false }))
);

export function loginReducer(state: LoginState | undefined, action: LoginActions) {
    return reducer(state, action);
}
