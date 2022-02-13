import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, exhaustMap } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CatergoryActions, LoadCategoryActionType, loadCategoryFailure, loadCategorySuccess } from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions: Actions<CatergoryActions>,
        private categoryService: CategoryService
    ) {}
    
    getCategories = createEffect(() => this.actions.pipe(
        ofType(LoadCategoryActionType),
        exhaustMap(() => this.categoryService.getCategories().pipe(
            map((result) => loadCategorySuccess({ results: result.results })),
            catchError((e) => {
                console.error(e);
                return of(loadCategoryFailure());
            })
        ))
    ));
}