import { createAction, props } from '@ngrx/store';

export const CreateAccountActionType = '[Create Account] Create';
export const CreateAccountAPISuccessActionType = '[Create Account API] Success';
export const CreateAccountAPIFailedActionType = '[Create Account API] Failed';

export interface CreateAccountAction {
    userName: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
}

export interface CreateActionFailed {
    errorReason: string;
}

export const createAccount = createAction(CreateAccountActionType, props<CreateAccountAction>());
export const createAccountSuccess = createAction(CreateAccountAPISuccessActionType);
export const createAccountFailure = createAction(CreateAccountAPIFailedActionType, props<CreateActionFailed>());