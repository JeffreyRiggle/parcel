import { HttpClient } from "@angular/common/http";
import { LoginAction } from "../data/actions/login.actions";
import { LoginService } from "./login.service";

describe('login service', () => {
    let service: LoginService;
    let postMock: jasmine.Spy;

    beforeEach(() => {
        postMock = jasmine.createSpy('post');
        service = new LoginService({
            post: postMock,
        } as unknown as HttpClient);
    });

    describe('when login request is made', () => {
        const request: LoginAction = {
            userName: 'Foo',
            password: 'Secure'
        };

        beforeEach(() => {
            service.login(request);
        });

        it('should hit the correct endpoint', () => {
            expect(postMock).toHaveBeenCalledWith('/api/account/login', request);
        });
    });
});