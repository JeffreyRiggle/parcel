import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { loginSuccess } from '../../../login/data/actions/login.actions';
import { UserEffects } from './user.effects';
import { LoginAPITokenActionType } from '../actions/user.actions';

describe('user effects', () => {
    let actions: Observable<any>;
    let effects: UserEffects;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: {} }),
            ]
        });

        effects = TestBed.inject(UserEffects);
        store = TestBed.inject(MockStore);
    });

    describe('when login succeeds', () => {
        let result: any;
        beforeEach((done) => {
            actions = of(loginSuccess({ token: 'someToken' }));
            effects.handleToken.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should dispatch a token action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: LoginAPITokenActionType, token: 'someToken' }));
        });
    });
});