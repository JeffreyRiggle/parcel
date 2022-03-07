import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsResult } from 'src/app/models/apps';

@Injectable({
    providedIn: 'root'
})
export class AppsService {
    constructor(private http: HttpClient) {}

    getAppsByCategory(categoryId: string) {
        return this.http.get<AppsResult>(`/api/app/categories/${categoryId}`);
    }
}