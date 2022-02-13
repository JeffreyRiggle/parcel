import { Action, createReducer, on } from '@ngrx/store';
import { AccountActions, createAccount, createAccountFailure, createAccountSuccess, CreateActionFailed } from '../actions/account.actions';

export interface AccountState {
    accountCreated: boolean;
    creationPending: boolean;
    error: boolean;
    errorReason: string;
}

export const initialState = {
    accountCreated: false,
    creationPending: false,
    error: false,
    errorReason: '',
};

const reducer = createReducer(
    initialState,
    on(createAccount, (state: AccountState) => ({ ...state, creationPending: true, error: false, errorReason: '' })),
    on(createAccountSuccess, (state: AccountState) => ({ ...state, accountCreated: true, creationPending: false })),
    on(createAccountFailure, (state: AccountState, props: CreateActionFailed) => ({ ...state, accountCreated: false, creationPending: false, error: true, errorReason: props.errorReason }))
);

export function accountReducer(state: AccountState | undefined, action: AccountActions) {
    return reducer(state, action);
}
