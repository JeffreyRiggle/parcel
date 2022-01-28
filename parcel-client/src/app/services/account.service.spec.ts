import { HttpClient } from "@angular/common/http";
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
        beforeEach(() => {
            service.createAccount();
        });

        it('should hit the correct endpoint', () => {
            expect(postMock).toHaveBeenCalledWith('/api/v1/account', jasmine.any(Object));
        });
    });
});