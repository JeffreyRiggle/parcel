import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountPageComponent } from './pages/createAccount/createAccountPage.component';

const routes: Routes = [
    { path: '', component: CreateAccountPageComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateAccountRoutingModule { }