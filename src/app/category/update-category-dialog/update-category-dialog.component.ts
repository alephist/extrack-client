import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { Category } from "./../../_models/category.model";
import { CategoryService } from "./../../_services/category.service";

@Component({
  selector: "app-update-category-dialog",
  templateUrl: "./update-category-dialog.component.html",
  styleUrls: ["./update-category-dialog.component.css"]
})
export class UpdateCategoryDialogComponent implements OnInit, OnDestroy {
  catItem: Category;
  isLoading: boolean;
  catForm: FormGroup;
  category$: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<UpdateCategoryDialogComponent>,
    private category: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: Category
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.catItem = this.data;
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  save() {
    this.isLoading = true;

    this.category$ = this.category
      .updateCategory({ id: this.catItem.id, name: this.catForm.value.name })
      .subscribe(
        () => {
          this.isLoading = false;
          this.catForm.reset();
          this.dialog.close(true);
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
    this.dialog.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.catForm.controls[controlName].hasError(errorName);
  }

  private loadForm() {
    this.catForm = this.fb.group({
      name: [this.catItem.name, [Validators.required, Validators.minLength(5)]]
    });
  }
}
