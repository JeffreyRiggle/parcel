import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createAccount } from '../data/actions/account.actions';
import { AccountState } from '../data/reducers/account.reducer';

@Component({
  selector: 'create-account',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})
export class CreateAccountComponent {
  public userName: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public gender: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private store: Store<{ login: AccountState}>) {}

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
