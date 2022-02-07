import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createAccount } from '../data/actions/account.actions';
import { AccountState } from '../data/reducers/account.reducer';

@Component({
  selector: 'create-account',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})
export class CreateAccountComponent implements OnDestroy {
  public userName: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public gender: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public hasError: boolean = false;
  private accountSubscription: Subscription;

  constructor(private store: Store<{ account: AccountState}>, private router: Router) {
    this.accountSubscription = store.select('account').subscribe((account: AccountState) => {
      this.hasError = account.error;
      if (account.accountCreated) {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  public createAccount() {
    this.store.dispatch(createAccount({
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      email: this.email,
      password: this.password,
    }));
  }
}
