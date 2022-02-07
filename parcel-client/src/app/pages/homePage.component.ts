import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from '../data/reducers/user.reducer';

// Notes
// If no JWT token show login button
// If no JWT no profile button
// If not JWT no upload options
// Always show a list of apps
@Component({
  selector: 'home-page',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss']
})
export class HomePageComponent implements OnDestroy {
  public token: string = '';
  private userSubscription: Subscription;

  constructor(store: Store<{ user: UserState}>, private router: Router) {
    this.userSubscription = store.select('user').subscribe((user: UserState) => {
      // TODO: figure out why this is not working
      this.token = user.token;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  login() {
    this.router.navigate(['login']);
  }
}
