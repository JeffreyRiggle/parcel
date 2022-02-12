import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './root/pages/home/homePage.component';
import { CategorySearchComponent } from './root/pages/categorySearch/categorySearch.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'create-account', loadChildren: () => import('./createAccount/createAccount.module').then(m => m.CreateAccountModule) },
  { path: 'category/:id', component: CategorySearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
