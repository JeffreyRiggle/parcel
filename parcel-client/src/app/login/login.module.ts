import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/loginForm/loginForm.component';
import { LoginPageComponent } from './pages/login/loginPage.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer } from './data/reducers/login.reducer';
import { LoginEffects } from './data/effects/login.effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule,
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginModule { }
