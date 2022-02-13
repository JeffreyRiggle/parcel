import { createAction, props } from '@ngrx/store';

export const LoginAPITokenActionType = '[Login API] Login Token Provided';

export interface TokenAction {
    token: string;
}

export const setToken = createAction(LoginAPITokenActionType, props<TokenAction>());
export type UserActions = ReturnType<typeof setToken>;
