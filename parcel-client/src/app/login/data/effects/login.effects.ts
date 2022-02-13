import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginActions, loginFailure, LoginFormLoginActionType, loginSuccess } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
    constructor(
        private actions: Actions<LoginActions>,
        private loginSerivce: LoginService
    ) {}
    
    login = createEffect(() => this.actions.pipe(
        ofType(LoginFormLoginActionType),
        switchMap((action) => this.loginSerivce.login({
            userName: action.userName,
            password: action.password,
        }).pipe(
            map((result) => loginSuccess({ token: result.token })),
            catchError((e) => {
                console.error(e);
                return of(loginFailure());
            })
        ))
    ));
}