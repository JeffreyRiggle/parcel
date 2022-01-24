import { HttpClient } from "@angular/common/http";
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
        beforeEach(() => {
            service.login();
        });

        it('should hit the correct endpoint', () => {
            expect(postMock).toHaveBeenCalledWith('/api/v1/login', jasmine.any(Object));
        });
    });
});