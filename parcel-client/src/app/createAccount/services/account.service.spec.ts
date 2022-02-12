import { HttpClient } from "@angular/common/http";
import { CreateAccountAction } from "../data/actions/account.actions";
import { AccountService } from "./account.service";

describe('account service', () => {
    let service: AccountService;
    let postMock: jasmine.Spy;

    beforeEach(() => {
        postMock = jasmine.createSpy('post');
        service = new AccountService({
            post: postMock,
        } as unknown as HttpClient);
    });

    describe('when create request is made', () => {
        const account: CreateAccountAction = {
            userName: 'foobar',
            firstName: 'foo',
            lastName: 'bar',
            email: 'a@b.c',
            gender: 'o',
            password: '1'
        };

        beforeEach(() => {
            service.createAccount(account);
        });

        it('should hit the correct endpoint', () => {
            expect(postMock).toHaveBeenCalledWith('/api/account', account);
        });
    });
});