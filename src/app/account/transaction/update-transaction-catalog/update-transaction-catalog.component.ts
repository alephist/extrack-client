import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { Category } from "../../../_models/category.model";
import { Transaction } from "../../../_models/transaction.model";
import { CategoryService } from "../../../_services/category.service";
import { TransactionService } from "../../../_services/transaction.service";
import { SnackbarService } from "../../../_services/snackbar.service";

@Component({
  selector: "app-update-transaction-catalog",
  templateUrl: "./update-transaction-catalog.component.html",
  styleUrls: ["./update-transaction-catalog.component.css"]
})
export class UpdateTransactionCatalogComponent implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  categories: Category[] = [];
  isLoading: boolean;
  private transactionItem: Transaction;
  private categorySub: Subscription;
  private transactionSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTransactionCatalogComponent>,
    private category: CategoryService,
    private transaction: TransactionService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: Transaction
  ) {}

  ngOnInit(): void {
    this.transactionItem = this.data;
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
      .updateTransaction({
        id: this.transactionItem.id,
        description,
        categoryId,
        date,
        amount
      })
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
    let { description, category, date, amount } = this.transactionItem;
    this.transactionForm = this.fb.group({
      description: [
        description,
        [Validators.required, Validators.minLength(5)]
      ],
      categoryId: [category.id, Validators.required],
      date: [date, Validators.required],
      amount: [amount, [Validators.required, Validators.min(1)]]
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
