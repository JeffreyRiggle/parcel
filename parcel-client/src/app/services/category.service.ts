import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CategoriesResult } from "../models/categories";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<CategoriesResult>('/api/app/categories');
    }
}