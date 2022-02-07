import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of } from 'rxjs';
import { LoginAPILoginSuccessActionType } from '../actions/login.actions';
import { LoginAPITokenActionType } from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions
    ) {}
    
    handleToken = createEffect(() => this.actions.pipe(
        ofType(LoginAPILoginSuccessActionType),
        mergeMap((action: any) => of({ type: LoginAPITokenActionType, token: action.token }))
    ));
}