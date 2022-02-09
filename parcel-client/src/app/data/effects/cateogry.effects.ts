import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryLoadFailureActionType, CategoryLoadSuccessActionType, LoadCategoryActionType } from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions: Actions,
        private categoryService: CategoryService
    ) {}
    
    getCategories = createEffect(() => this.actions.pipe(
        ofType(LoadCategoryActionType),
        mergeMap(() => this.categoryService.getCategories().pipe(
            map((result) => ({ type: CategoryLoadSuccessActionType, results: result.results })),
            catchError((e) => {
                console.error(e);
                return of({ type: CategoryLoadFailureActionType })
            })
        ))
    ));
}