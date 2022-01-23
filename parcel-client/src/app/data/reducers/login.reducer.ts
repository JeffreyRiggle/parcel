import { Action, createReducer, on } from '@ngrx/store';
import { login } from '../actions/login.actions';

export interface LoginState {
    loginPending: boolean;
}

export const initialState = {
    loginPending: false,
};

const reducer = createReducer(
    initialState,
    on(login, (state: LoginState) => ({ ...state, loginPending: true }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    return reducer(state, action);
}
