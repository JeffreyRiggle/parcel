import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './components/createAccount/createAccount.component';
import { CreateAccountPageComponent } from './pages/createAccount/createAccountPage.component';
import { accountReducer } from './data/reducers/account.reducer';
import { AccountEffects } from './data/effects/account.effects';
import { CreateAccountRoutingModule } from './createAccount-routing.module';

@NgModule({
  declarations: [
    CreateAccountComponent,
    CreateAccountPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CreateAccountRoutingModule,
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class CreateAccountModule { }
