import { Action, createReducer, on, props } from '@ngrx/store';
import { setToken, TokenAction } from '../actions/user.actions';

export interface UserState {
    token: string;
}

export const initialState = {
    token: '',
};

const reducer = createReducer(
    initialState,
    on(setToken, (state: UserState, props: TokenAction) => ({ ...state, token: props.token }))
);

export function userReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}
