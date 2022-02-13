import { createReducer, on } from '@ngrx/store';
import { setToken, TokenAction, UserActions } from '../actions/user.actions';

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

export function userReducer(state: UserState | undefined, action: UserActions) {
    return reducer(state, action);
}
