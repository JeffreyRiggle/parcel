import { createAction, props } from '@ngrx/store';
import { TokenResult } from 'src/app/models/token';

export const LoginFormLoginActionType = '[Login Form] Login';
export const LoginAPILoginSuccessActionType = '[Login API] Login Success';
export const LoginAPILoginFailedActionType = '[Login API] Login Failed';

export interface LoginAction {
    userName: string;
    password: string;
}

export const login = createAction(LoginFormLoginActionType, props<LoginAction>());
export const loginSuccess = createAction(LoginAPILoginSuccessActionType, props<TokenResult>());
export const loginFailure = createAction(LoginAPILoginFailedActionType);
export type LoginActions = ReturnType<typeof login> | ReturnType<typeof loginSuccess> | ReturnType<typeof loginFailure>;