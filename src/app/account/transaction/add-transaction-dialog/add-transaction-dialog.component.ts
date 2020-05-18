import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { Category } from "../../../_models/category.model";
import { CategoryService } from "../../../_services/category.service";
import { TransactionService } from "../../../_services/transaction.service";
import { SnackbarService } from "../../../_services/snackbar.service";

@Component({
  selector: "app-add-transaction-dialog",
  templateUrl: "./add-transaction-dialog.component.html",
  styleUrls: ["./add-transaction-dialog.component.css"]
})
export class AddTransactionDialogComponent implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  categories: Category[] = [];
  isLoading: boolean;
  private categorySub: Subscription;
  private transactionSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    private category: CategoryService,
    private transaction: TransactionService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadForm();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.transactionSub.unsubscribe();
  }

  save() {
    let { description, categoryId, date, amount } = this.transactionForm.value;

    this.isLoading = true;

    this.transactionSub = this.transaction
      .addTransaction({ description, date, amount, categoryId })
      .subscribe(
        () => this.transactionForm.reset(),
        error => {
          this.snackbar.error(error);
          this.isLoading = false;
          this.close();
        },
        () => {
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.transactionForm.controls[controlName].hasError(errorName);
  }

  private loadForm() {
    this.transactionForm = this.fb.group({
      description: ["", [Validators.required, Validators.minLength(5)]],
      categoryId: [null, Validators.required],
      date: [new Date(), Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  private loadCategories() {
    this.categorySub = this.category.getCategories().subscribe(
      res => (this.categories = res),
      () => {
        this.snackbar.error("Error loading form");
        this.isLoading = false;
        this.close();
      },
      () => (this.isLoading = false)
    );
  }
}
