import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { Category } from "./../../_models/category.model";
import { CategoryService } from "./../../_services/category.service";

import { AddCategoryDialogComponent } from "../add-category-dialog/add-category-dialog.component";
import { UpdateCategoryDialogComponent } from "../update-category-dialog/update-category-dialog.component";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  data: Category[] = [];
  isLoading: boolean;
  category$: Subscription;

  displayedColumns: string[] = ["name", "action"];

  constructor(private category: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  addCategory() {
    const addCategoryDialogRef = this.dialog.open(AddCategoryDialogComponent);

    addCategoryDialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          alert("Category has been added!");
          this.loadCategories();
        }
      },
      error => console.log(error)
    );
  }

  updateCategory(category: Category) {
    const updateCategoryDialogRef = this.dialog.open(
      UpdateCategoryDialogComponent,
      { data: category }
    );

    updateCategoryDialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          alert("Category has been updated!");
          this.loadCategories();
        }
      },
      error => console.log(error)
    );
  }

  deleteCategory(id: number) {
    if (confirm("Are you sure you want to delete this?")) {
      this.category$ = this.category.deleteCategory(id).subscribe(
        () => {
          alert("Category has been deleted!");
          this.loadCategories();
        },
        error => console.log(error)
      );
    }
  }

  private loadCategories() {
    this.isLoading = true;

    this.category$ = this.category.getCategories().subscribe(
      res => {
        this.data = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
