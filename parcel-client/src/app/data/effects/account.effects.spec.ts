import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { login } from '../actions/login.actions';
import { AccountEffects } from './account.effects';
import { AccountService } from 'src/app/services/account.service';
import { createAccount } from '../actions/account.actions';

class MockAccountService {
    createAccount = jasmine.createSpy('createAccount').and.callFake(() => of(true))
}

describe('account effects', () => {
    let actions: Observable<any>;
    let effects: AccountEffects;
    let store: MockStore;
    let service: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccountEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: {} }),
                { provide: AccountService, useClass: MockAccountService }
            ]
        });

        effects = TestBed.inject(AccountEffects);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(AccountService);
    });

    describe('when effect is triggered', () => {
        let result: any;
        beforeEach((done) => {
            actions = of(createAccount({
                userName: 'foo',
                firstName: 'foo',
                lastName: 'user',
                gender: 'M',
                email: 'a@b.c',
                password: 'bar'
            }));

            effects.createAccount.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the create api', () => {
            expect(service.createAccount).toHaveBeenCalled();
        });
    });
});