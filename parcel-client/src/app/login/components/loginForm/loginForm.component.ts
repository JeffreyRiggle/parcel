import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { login } from '../../data/actions/login.actions';
import { LoginState } from '../../data/reducers/login.reducer';

@Component({
  selector: 'login-form',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  public userName: string;
  public password: string;
  public loginPending: boolean;
  public hasError: boolean;
  private loginSubscription: Subscription;

  constructor(private store: Store<{ login: LoginState}>, private router: Router) {
    this.password = '';
    this.userName = '';
    this.loginPending = false;
    this.hasError = false;
  
    this.loginSubscription = store.select('login').subscribe((login: LoginState) => {
      this.loginPending = login.loginPending;
      this.hasError = login.error;
      if (login.success) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  public attemptLogin() {
    this.store.dispatch(login({ password: this.password, userName: this.userName }));
  }
}
