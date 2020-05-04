import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { Category } from "./../../_models/category.model";
import { CategoryService } from "./../../_services/category.service";
import { SnackbarService } from "./../../_services/snackbar.service";

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
  private categorySub: Subscription;

  displayedColumns: string[] = ["name", "action"];

  constructor(
    private category: CategoryService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  addCategory() {
    const addCategoryDialogRef = this.dialog.open(AddCategoryDialogComponent);

    addCategoryDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.success("Category has been added!");
        this.loadCategories();
      }
    });
  }

  updateCategory(category: Category) {
    const updateCategoryDialogRef = this.dialog.open(
      UpdateCategoryDialogComponent,
      { data: category }
    );

    updateCategoryDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.success("Category has been updated!");
        this.loadCategories();
      }
    });
  }

  deleteCategory(id: number) {
    this.categorySub = this.snackbar
      .confirm("Delete this category?", "Delete")
      .pipe(switchMap(() => this.category.deleteCategory(id)))
      .subscribe(
        () => {
          this.snackbar.success("Category has been deleted!");
          this.loadCategories();
        },
        error => this.snackbar.error(error)
      );
  }

  private loadCategories() {
    this.isLoading = true;

    this.categorySub = this.category.getCategories().subscribe(
      res => {
        this.data = res;
        this.isLoading = false;
      },
      error => {
        this.snackbar.error(error);
        this.isLoading = false;
      }
    );
  }
}
