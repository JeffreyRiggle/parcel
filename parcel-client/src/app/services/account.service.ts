import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private http: HttpClient) {}

    createAccount() {
        // hack for now
        return this.http.post('/api/v1/account', {});
    }
}