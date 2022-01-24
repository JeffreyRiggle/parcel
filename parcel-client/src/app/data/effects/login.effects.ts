import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { LoginAPILoginFailedActionType, LoginAPILoginSuccessActionType, LoginFormLoginActionType } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
    constructor(
        private actions: Actions,
        private loginSerivce: LoginService
    ) {}
    
    login = createEffect(() => this.actions.pipe(
        ofType(LoginFormLoginActionType),
        mergeMap(() => this.loginSerivce.login().pipe(
            map(result => ({ type: LoginAPILoginSuccessActionType })),
            catchError(() => of({ type: LoginAPILoginFailedActionType }))
        ))
    ));
}