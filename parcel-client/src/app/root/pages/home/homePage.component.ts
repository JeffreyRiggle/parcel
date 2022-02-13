import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from '../../data/reducers/user.reducer';

// Notes
// If no JWT token show login button
// If no JWT no profile button
// If not JWT no upload options
@Component({
  selector: 'home-page',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss']
})
export class HomePageComponent implements OnDestroy {
  public token: string = '';
  private userSubscription: Subscription;

  constructor(store: Store<{ user: UserState }>) {
    this.userSubscription = store.select('user').subscribe((user: UserState) => {
      this.token = user.token;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
