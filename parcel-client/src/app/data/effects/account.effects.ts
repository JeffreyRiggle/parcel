import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { CreateAccountActionType, CreateAccountAPIFailedActionType, CreateAccountAPISuccessActionType } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
    constructor(
        private actions: Actions,
        private accountService: AccountService
    ) {}
    
    createAccount = createEffect(() => this.actions.pipe(
        ofType(CreateAccountActionType),
        mergeMap((action: any) => this.accountService.createAccount({
            userName: action.userName,
            firstName: action.firstName,
            lastName: action.lastName,
            gender: action.gender,
            email: action.email,
            password: action.password,
        }).pipe(
            map(result => ({ type: CreateAccountAPISuccessActionType })),
            catchError(() => of({ type: CreateAccountAPIFailedActionType }))
        ))
    ));
}