import { LoginAPILoginFailedActionType, LoginAPILoginSuccessActionType, LoginFormLoginActionType } from '../actions/login.actions';
import { loginReducer, LoginState } from './login.reducer';

describe('login reducer', () => {
    let result: LoginState;

    describe('when login request is made', () => {
        beforeEach(() => {
            result = loginReducer(undefined, { type: LoginFormLoginActionType });
        });

        it('should set the loading state', () => {
            expect(result.loginPending).toBe(true);
        });

        describe('when api result is successful', () => {
            beforeEach(() => {
                result = loginReducer(result, { type: LoginAPILoginSuccessActionType });
            });

            it('should no longer be loading', () => {
                expect(result.loginPending).toBe(false);
            });

            it('should not have an error state', () => {
                expect(result.error).toBe(false);
            });

            it('should not have a success state', () => {
                expect(result.success).toBe(true);
            });
        });

        describe('when api result is a failure', () => {
            beforeEach(() => {
                result = loginReducer(result, { type: LoginAPILoginFailedActionType });
            });

            it('should no longer be loading', () => {
                expect(result.loginPending).toBe(false);
            });

            it('should have an error state', () => {
                expect(result.error).toBe(true);
            });

            it('should not have a success state', () => {
                expect(result.success).toBe(false);
            });
        });
    });
});
