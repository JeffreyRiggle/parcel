import { CategoryLoadFailureActionType, CategoryLoadSuccessActionType, LoadCategoryActionType } from '../actions/category.actions';
import { categoryReducer, CategoryState } from './category.reducer';

describe('category reducer', () => {
    let result: CategoryState;

    describe('when load request is made', () => {
        beforeEach(() => {
            result = categoryReducer(undefined, { type: LoadCategoryActionType });
        });

        it('should set the loading state', () => {
            expect(result.loadingCategories).toBe(true);
        });

        describe('when api result is successful', () => {
            beforeEach(() => {
                result = categoryReducer(result, { type: CategoryLoadSuccessActionType, results: ['category1', 'category2'] } as any);
            });

            it('should no longer be loading', () => {
                expect(result.loadingCategories).toBe(false);
            });

            it('should not have an error state', () => {
                expect(result.error).toBe(false);
            });

            it('should have the categories', () => {
                expect(result.categories).toEqual(['category1', 'category2']);
            })
        });

        describe('when api result is a failure', () => {
            beforeEach(() => {
                result = categoryReducer(result, { type: CategoryLoadFailureActionType });
            });

            it('should no longer be loading', () => {
                expect(result.loadingCategories).toBe(false);
            });

            it('should have an error state', () => {
                expect(result.error).toBe(true);
            });
        });
    });
});
