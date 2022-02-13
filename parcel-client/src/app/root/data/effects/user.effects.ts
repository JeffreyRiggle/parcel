import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, of } from 'rxjs';
import { LoginAPILoginSuccessActionType } from '../../../login/data/actions/login.actions';
import { setToken, UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions<UserActions>
    ) {}
    
    handleToken = createEffect(() => this.actions.pipe(
        ofType(LoginAPILoginSuccessActionType),
        concatMap((action: any) => of(setToken({ token: action.token })))
    ));
}