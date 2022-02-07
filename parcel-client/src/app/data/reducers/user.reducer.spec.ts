import { LoginAPITokenActionType } from '../actions/user.actions';
import { userReducer, UserState } from './user.reducer';

describe('user reducer', () => {
    let result: UserState;

    describe('when login token is given', () => {
        beforeEach(() => {
            result = userReducer(undefined, { type: LoginAPITokenActionType, token: 'sometoken' } as any);
        });

        it('should set the user token', () => {
            expect(result.token).toBe('sometoken');
        });
    });
});
