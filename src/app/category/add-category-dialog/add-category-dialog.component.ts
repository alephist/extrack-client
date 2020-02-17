import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { CategoryService } from "./../../_services/category.service";

@Component({
  selector: "app-add-category-dialog",
  templateUrl: "./add-category-dialog.component.html",
  styleUrls: ["./add-category-dialog.component.css"]
})
export class AddCategoryDialogComponent implements OnInit, OnDestroy {
  catForm: FormGroup;
  isLoading: boolean;
  category$: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  save() {
    this.isLoading = true;

    this.category$ = this.category
      .addCategory(this.catForm.value.name)
      .subscribe(
        () => {
          this.isLoading = false;
          this.catForm.reset();
          this.dialogRef.close(true);
        },
        error => {
          this.isLoading = false;
          this.catForm.reset();
          this.close();
          console.log(error);
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  loadForm(): void {
    this.catForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.catForm.controls[controlName].hasError(errorName);
  }
}
