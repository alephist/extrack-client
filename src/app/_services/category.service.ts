import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Category } from "../_models/category.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCategories() {
    return this.http.get<Category[]>(
      this.createCategoryRoute(this.auth.currentUser.id)
    );
  }

  addCategory(name: string) {
    return this.http.post<Category>(
      this.createCategoryRoute(this.auth.currentUser.id),
      { name }
    );
  }

  updateCategory(category: Category) {
    return this.http.put(
      this.createCategoryRoute(this.auth.currentUser.id, category.id),
      {
        name: category.name
      }
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(
      this.createCategoryRoute(this.auth.currentUser.id, id)
    );
  }

  private createCategoryRoute(userId: number, id?: number): string {
    if (id) {
      return `${environment.baseUrl}/api/users/${userId}/categories/${id}`;
    }

    return `${environment.baseUrl}/api/users/${userId}/categories`;
  }
}
