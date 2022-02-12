import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { LoginEffects } from './login.effects';
import { login, LoginAPILoginFailedActionType, LoginAPILoginSuccessActionType } from '../actions/login.actions';
import { LoginService } from '../../services/login.service';

class MockLoginService {
    login = jasmine.createSpy('login').and.callFake(() => of({
        token: 'sometoken'
    }))
}

describe('login effects', () => {
    let actions: Observable<any>;
    let effects: LoginEffects;
    let store: MockStore;
    let service: LoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: {} }),
                { provide: LoginService, useClass: MockLoginService }
            ]
        });

        effects = TestBed.inject(LoginEffects);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(LoginService);
    });

    describe('when login succeeds', () => {
        let result: any;
        beforeEach((done) => {
            actions = of(login({ userName: 'foo', password: 'bar' }));
            effects.login.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the login api', () => {
            expect(service.login).toHaveBeenCalledWith({ userName: 'foo', password: 'bar' });
        });

        it('should dispatch a login success action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: LoginAPILoginSuccessActionType }));
        })
    });

    describe('when login fails', () => {
        let result: any;
        beforeEach((done) => {
            service.login = jasmine.createSpy('login').and.callFake(() => throwError(() => new Error('Bad Request')));
            actions = of(login({ userName: 'foo', password: 'bar' }));
            effects.login.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the login api', () => {
            expect(service.login).toHaveBeenCalledWith({ userName: 'foo', password: 'bar' });
        });

        it('should dispatch a login failed action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: LoginAPILoginFailedActionType }));
        })
    });
});