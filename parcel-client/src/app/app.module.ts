import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/loginForm.component';
import { LoginPageComponent } from './pages/loginPage.component';

import { StoreModule } from '@ngrx/store';
import { loginReducer } from './data/reducers/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './data/effects/login.effects';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountPageComponent } from './pages/createAccountPage.component';
import { CreateAccountComponent } from './components/createAccount.component';
import { accountReducer } from './data/reducers/account.reducer';
import { AccountEffects } from './data/effects/account.effects';
import { HomePageComponent } from './pages/homePage.component';
import { UserEffects } from './data/effects/user.effects';
import { userReducer } from './data/reducers/user.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    // TODO see if we can break this into a feature module for login
    LoginFormComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    CreateAccountComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer, account: accountReducer, user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([LoginEffects, AccountEffects, UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
