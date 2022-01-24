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

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer }),
    EffectsModule.forRoot([LoginEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
