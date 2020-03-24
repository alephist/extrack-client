import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { Transaction } from "./../../_models/transaction.model";
import { TransactionService } from "./../../_services/transaction.service";
import { SnackbarService } from "./../../_services/snackbar.service";

import { AddTransactionDialogComponent } from "./../add-transaction-dialog/add-transaction-dialog.component";
import { UpdateTransactionCatalogComponent } from "./../update-transaction-catalog/update-transaction-catalog.component";

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.css"]
})
export class TransactionListComponent implements OnInit, OnDestroy {
  data: Transaction[] = [];
  isLoading: boolean;
  private transactionSub: Subscription;

  displayedColumns: string[] = [
    "description",
    "category",
    "date",
    "amount",
    "action"
  ];

  constructor(
    private transaction: TransactionService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.transactionSub.unsubscribe();
  }

  addTransaction() {
    const addTransactionDialogRef = this.dialog.open(
      AddTransactionDialogComponent
    );

    addTransactionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.success("Transaction has been added!");
        this.loadTransactions();
      }
    });
  }

  updateTransaction(item: Transaction) {
    const updateTransactionDialogRef = this.dialog.open(
      UpdateTransactionCatalogComponent,
      { data: item }
    );

    updateTransactionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.success("Transaction has been updated!");
        this.loadTransactions();
      }
    });
  }

  deleteTransaction(id: number) {
    this.transactionSub = this.snackbar
      .confirm("Delete this transaction?", "Delete")
      .pipe(switchMap(() => this.transaction.deleteTransaction(id)))
      .subscribe(
        () => {
          this.snackbar.success("Transaction has been deleted");
          this.loadTransactions();
        },
        () => this.snackbar.error("Problem in removing transaction")
      );
  }

  private loadTransactions() {
    this.isLoading = true;

    this.transactionSub = this.transaction.getTransactions().subscribe(
      res => {
        this.data = res;
        this.isLoading = false;
      },
      () => {
        this.snackbar.error("Problem fetching transactions");
        this.isLoading = false;
      }
    );
  }
}
