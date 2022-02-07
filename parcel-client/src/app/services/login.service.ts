import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginAction } from "../data/actions/login.actions";
import { TokenResult } from "../models/token";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(request: LoginAction) {
        return this.http.post<TokenResult>('/api/account/login', request);
    }
}