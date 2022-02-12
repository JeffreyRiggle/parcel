import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryEffects } from './cateogry.effects';
import { CategoryLoadFailureActionType, CategoryLoadSuccessActionType, loadCategories } from '../actions/category.actions';

class MockCategoryService {
    getCategories = jasmine.createSpy('getCategories').and.callFake(() => of({
        results: ['category1', 'category2']
    }))
}

describe('login effects', () => {
    let actions: Observable<any>;
    let effects: CategoryEffects;
    let store: MockStore;
    let service: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CategoryEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: {} }),
                { provide: CategoryService, useClass: MockCategoryService }
            ]
        });

        effects = TestBed.inject(CategoryEffects);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(CategoryService);
    });

    describe('when get categories succeeds', () => {
        let result: any;
        beforeEach((done) => {
            actions = of(loadCategories());
            effects.getCategories.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the get categories api', () => {
            expect(service.getCategories).toHaveBeenCalled();
        });

        it('should dispatch a load success success action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: CategoryLoadSuccessActionType }));
        });
    });

    describe('when get categories fails', () => {
        let result: any;
        beforeEach((done) => {
            service.getCategories = jasmine.createSpy('getCategories').and.callFake(() => throwError(() => new Error('Bad Request')));
            actions = of(loadCategories());
            effects.getCategories.subscribe(res => {
                result = res;
                done();
            });
        });

        it('should invoke the get category api', () => {
            expect(service.getCategories).toHaveBeenCalled();
        });

        it('should dispatch a category load failed action', () => {
            expect(result).toEqual(jasmine.objectContaining({ type: CategoryLoadFailureActionType }));
        })
    });
});