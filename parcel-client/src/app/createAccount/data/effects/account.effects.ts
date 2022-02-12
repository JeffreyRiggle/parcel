import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { CreateAccountActionType, createAccountFailure, createAccountSuccess } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
    constructor(
        private actions: Actions,
        private accountService: AccountService
    ) {}
    
    createAccount = createEffect(() => this.actions.pipe(
        ofType(CreateAccountActionType),
        switchMap((action: any) => this.accountService.createAccount({
            userName: action.userName,
            firstName: action.firstName,
            lastName: action.lastName,
            gender: action.gender,
            email: action.email,
            password: action.password,
        }).pipe(
            map(createAccountSuccess),
            catchError((e) => { 
                console.error(e);
                return of(createAccountFailure({ errorReason: e.message}));
            })
        ))
    ));
}