import { HttpClient } from "@angular/common/http";
import { CategoryService } from "./category.service";

describe('category service', () => {
    let service: CategoryService;
    let getMock: jasmine.Spy;

    beforeEach(() => {
        getMock = jasmine.createSpy('get');
        service = new CategoryService({
            get: getMock,
        } as unknown as HttpClient);
    });

    describe('when get categories request is made', () => {
        beforeEach(() => {
            service.getCategories();
        });

        it('should hit the correct endpoint', () => {
            expect(getMock).toHaveBeenCalledWith('/api/app/categories');
        });
    });
});