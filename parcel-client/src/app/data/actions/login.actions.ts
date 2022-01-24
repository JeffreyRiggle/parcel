import { createAction, props } from '@ngrx/store';

export const LoginFormLoginActionType = '[Login Form] Login';
export const LoginAPILoginSuccessActionType = '[Login API] Login Success';
export const LoginAPILoginFailedActionType = '[Login API] Login Failed';

export interface LoginAction {
    userName: string;
    password: string;
}

export const login = createAction(LoginFormLoginActionType, props<LoginAction>());
export const loginSuccess = createAction(LoginAPILoginSuccessActionType);
export const loginFailure = createAction(LoginAPILoginFailedActionType);
