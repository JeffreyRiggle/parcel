import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppMetaData } from 'src/app/models/apps';
import { loadAppsByCategory } from '../../data/actions/app.actions';
import { AppsState } from '../../data/reducers/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './appList.component.html',
  styleUrls: ['./appList.component.scss']
})
export class AppListComponent implements OnDestroy, OnInit, OnChanges {
  public apps: AppMetaData[];
  private subscription: Subscription;

  @Input()
  public category?: string | null;

  constructor(private store: Store<{ apps: AppsState}>) {
      this.apps = [];
      this.subscription = this.store.select('apps').subscribe(state => {
          this.apps = state.apps;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['category'].firstChange) {
        return;
      }

      this.store.dispatch(loadAppsByCategory({ category: this.category ?? '' }));
  }

  ngOnInit(): void {
      this.store.dispatch(loadAppsByCategory({ category: this.category ?? '' }));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
