import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createAccount } from '../../data/actions/account.actions';
import { AccountState } from '../../data/reducers/account.reducer';

@Component({
  selector: 'create-account',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})
export class CreateAccountComponent implements OnDestroy {
  public hasError: boolean = false;
  public createAccountForm: FormGroup;

  private accountSubscription: Subscription;

  constructor(
    private store: Store<{ account: AccountState}>,
    private router: Router,
    private builder: FormBuilder,
  ) {
    this.accountSubscription = store.select('account').subscribe((account: AccountState) => {
      this.hasError = account.error;
      if (account.accountCreated) {
        this.router.navigate(['login']);
      }
    });

    this.createAccountForm = this.builder.group({
      userName: ['', [Validators.required]],
      firstName: '',
      lastName: '',
      gender: '',
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, , this.validateMatchingPassword(() => this.password)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  public createAccount() {
    this.store.dispatch(createAccount({
      userName: this.userName?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      gender: this.gender?.value,
      email: this.email?.value,
      password: this.password?.value,
    }));
  }

  private validateMatchingPassword(confirmControl: () => AbstractControl | null): ValidatorFn {
    return (control: AbstractControl) => {
      const matching = control?.value === confirmControl()?.value;
      return !matching ? { matching: true } : null;
    }
  }

  private get userName() {
    return this.createAccountForm?.get('userName'); 
  }

  private get firstName() {
    return this.createAccountForm?.get('firstName');
  }

  private get lastName() {
    return this.createAccountForm?.get('lastName');
  }

  private get gender() {
    return this.createAccountForm?.get('gender');
  }

  private get email() {
    return this.createAccountForm?.get('email');
  }

  private get password() {
    return this.createAccountForm?.get('password');
  }
}
