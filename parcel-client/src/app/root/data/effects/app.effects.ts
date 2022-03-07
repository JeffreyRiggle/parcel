import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, exhaustMap } from 'rxjs';
import { AppsService } from '../../services/apps.service';
import { AppActions, LoadAppsByCategoryActionType, loadAppsByCategoryFailure, loadAppsByCategorySuccess } from '../actions/app.actions';

@Injectable()
export class AppEffects {
    constructor(
        private actions: Actions<AppActions>,
        private appsService: AppsService
    ) {}
    
    getCategories = createEffect(() => this.actions.pipe(
        ofType(LoadAppsByCategoryActionType),
        exhaustMap((props) => this.appsService.getAppsByCategory(props.category).pipe(
            map((result) => loadAppsByCategorySuccess({ results: result.results })),
            catchError((e) => {
                console.error(e);
                return of(loadAppsByCategoryFailure({ category: props.category }));
            })
        ))
    ));
}