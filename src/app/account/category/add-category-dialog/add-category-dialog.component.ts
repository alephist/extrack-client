import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { CategoryService } from "../../../_services/category.service";
import { SnackbarService } from "../../../_services/snackbar.service";

@Component({
  selector: "app-add-category-dialog",
  templateUrl: "./add-category-dialog.component.html",
  styleUrls: ["./add-category-dialog.component.css"]
})
export class AddCategoryDialogComponent implements OnInit, OnDestroy {
  catForm: FormGroup;
  isLoading: boolean;
  private categorySub: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private category: CategoryService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  save() {
    this.isLoading = true;

    this.categorySub = this.category
      .addCategory(this.catForm.value.name)
      .subscribe(
        () => {
          this.isLoading = false;
          this.catForm.reset();
          this.dialogRef.close(true);
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
    this.dialogRef.close();
  }

  loadForm(): void {
    this.catForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.catForm.controls[controlName].hasError(errorName);
  }
}
