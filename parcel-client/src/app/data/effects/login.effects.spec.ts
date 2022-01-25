import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { LoginEffects } from './login.effects';
import { login, LoginFormLoginActionType } from '../actions/login.actions';

class MockLoginService {
    login = jasmine.createSpy('login').and.callFake(() => Promise.resolve())
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

    describe('when effect is triggered', () => {
        let result: any;
        beforeEach(() => {
            actions = of(login({ userName: 'foo', password: 'bar' }));
            effects.login.subscribe(res => {
                result = res;
            });
        });

        it('should invoke the login api', () => {
            expect(service.login).toHaveBeenCalled();
        });
    });
});