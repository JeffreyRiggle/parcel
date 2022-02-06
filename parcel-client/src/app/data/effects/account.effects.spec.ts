import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AccountEffects } from './account.effects';
import { AccountService } from 'src/app/services/account.service';
import { createAccount, CreateAccountAPIFailedActionType, CreateAccountAPISuccessActionType } from '../actions/account.actions';

class MockAccountService {
    createAccount = jasmine.createSpy('createAccount').and.callFake(() => of(true))
}

describe('account effects', () => {
    let actions: Observable<any>;
    let effects: AccountEffects;
    let store: MockStore;
    let service: AccountService;
    let accountRequest = {
        userName: 'foo',
        firstName: 'foo',
        lastName: 'user',
        gender: 'M',
        email: 'a@b.c',
        password: 'bar'
    };

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

    describe('when account is created', () => {
        let result: any;
        beforeEach((done) => {
            actions = of(createAccount(accountRequest));

            effects.createAccount.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the create api', () => {
            expect(service.createAccount).toHaveBeenCalled();
        });

        it('should dispatch account created action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: CreateAccountAPISuccessActionType }));
        });
    });

    describe('when account fails to create', () => {
        let result: any;
        beforeEach((done) => {
            service.createAccount = jasmine.createSpy('createAccount').and.callFake(() => throwError(() => new Error('Creation failed')))
            actions = of(createAccount(accountRequest));

            effects.createAccount.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the create api', () => {
            expect(service.createAccount).toHaveBeenCalled();
        });

        it('should dispatch account creation failed action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: CreateAccountAPIFailedActionType }));
        });
    });
});