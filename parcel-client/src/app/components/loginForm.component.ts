import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { login } from '../data/actions/login.actions';
import { LoginState } from '../data/reducers/login.reducer';

@Component({
  selector: 'login-form',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  public userName: string;
  public password: string;
  public loginPending: boolean;
  private loginSubscription: Subscription;

  constructor(private store: Store<{ login: LoginState}>) {
    this.password = '';
    this.userName = '';
    this.loginPending = false;
    this.loginSubscription = store.select('login').subscribe((login: LoginState) => {
      this.loginPending = login.loginPending;
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  public attemptLogin() {
    this.store.dispatch(login({ password: this.password, userName: this.userName }))
  }
}
