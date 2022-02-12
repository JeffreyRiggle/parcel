import { Action, ActionType } from '@ngrx/store';
import { CreateAccountActionType, CreateAccountAPIFailedActionType, CreateAccountAPISuccessActionType, CreateActionFailed } from '../actions/account.actions';
import { accountReducer, AccountState } from './account.reducer';

describe('account reducer', () => {
    let result: AccountState;

    describe('when create request is made', () => {
        beforeEach(() => {
            result = accountReducer(undefined, { type: CreateAccountActionType });
        });

        it('should set the loading state', () => {
            expect(result.creationPending).toBe(true);
        });

        describe('when api result is successful', () => {
            beforeEach(() => {
                result = accountReducer(result, { type: CreateAccountAPISuccessActionType });
            });

            it('should no longer be loading', () => {
                expect(result.creationPending).toBe(false);
            });

            it('should not have an error state', () => {
                expect(result.error).toBe(false);
            });
        });

        describe('when api result is a failure', () => {
            beforeEach(() => {
                result = accountReducer(result, { type: CreateAccountAPIFailedActionType });
            });

            it('should no longer be loading', () => {
                expect(result.creationPending).toBe(false);
            });

            it('should have an error state', () => {
                expect(result.error).toBe(true);
            });
        });
    });
});
