import { createAction, props } from '@ngrx/store';

export interface LoginAction {
    userName: string;
    password: string;
}

export const login = createAction('[Login Form] Login', props<LoginAction>());
