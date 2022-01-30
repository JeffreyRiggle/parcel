import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CreateAccountAction } from "../data/actions/account.actions";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private http: HttpClient) {}

    createAccount(account: CreateAccountAction) {
        return this.http.post('/api/account', account);
    }
}