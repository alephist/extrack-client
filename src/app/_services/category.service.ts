import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Category } from "../_models/category.model";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private categoryUrl: string = `${environment.baseUrl}/api/categories`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  addCategory(name: string) {
    return this.http.post<Category>(this.categoryUrl, { name });
  }

  updateCategory(category: Category) {
    return this.http.put(`${this.categoryUrl}/${category.id}`, {
      name: category.name
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }
}
