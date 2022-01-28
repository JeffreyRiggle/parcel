import { Action, createReducer, on } from '@ngrx/store';
import { ActionType } from '@ngrx/store/src/models';
import { createAccount, createAccountFailure, createAccountSuccess, CreateActionFailed } from '../actions/account.actions';

export interface AccountState {
    creationPending: boolean;
    error: boolean;
    errorReason: string;
}

export const initialState = {
    creationPending: false,
    error: false,
    errorReason: '',
};

const reducer = createReducer(
    initialState,
    on(createAccount, (state: AccountState) => ({ ...state, creationPending: true, error: false, errorReason: '' })),
    on(createAccountSuccess, (state: AccountState) => ({ ...state, creationPending: false })),
    on(createAccountFailure, (state: AccountState, props: CreateActionFailed) => ({ ...state, creationPending: false, error: true, errorReason: props.errorReason }))
);

export function accountReducer(state: AccountState | undefined, action: Action | ActionType<CreateActionFailed>) {
    return reducer(state, action);
}
