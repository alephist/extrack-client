import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { Category } from "../../../_models/category.model";
import { CategoryService } from "../../../_services/category.service";
import { SnackbarService } from "../../../_services/snackbar.service";

@Component({
  selector: "app-update-category-dialog",
  templateUrl: "./update-category-dialog.component.html",
  styleUrls: ["./update-category-dialog.component.css"]
})
export class UpdateCategoryDialogComponent implements OnInit, OnDestroy {
  catItem: Category;
  isLoading: boolean;
  catForm: FormGroup;
  private categorySub: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<UpdateCategoryDialogComponent>,
    private category: CategoryService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: Category
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.catItem = this.data;
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  save() {
    this.isLoading = true;

    this.categorySub = this.category
      .updateCategory({ id: this.catItem.id, name: this.catForm.value.name })
      .subscribe(
        () => {
          this.isLoading = false;
          this.catForm.reset();
          this.dialog.close(true);
        },
        error => {
          this.isLoading = false;
          this.snackbar.error(error);
          this.catForm.reset();
          this.close();
        }
      );
  }

  close() {
    this.dialog.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.catForm.controls[controlName].hasError(errorName);
  }

  private loadForm() {
    this.catForm = this.fb.group({
      name: [this.catItem.name, [Validators.required, Validators.minLength(4)]]
    });
  }
}
