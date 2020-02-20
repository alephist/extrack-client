import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { Transaction } from "./../../_models/transaction.model";
import { TransactionService } from "./../../_services/transaction.service";

import { AddTransactionDialogComponent } from "./../add-transaction-dialog/add-transaction-dialog.component";

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.css"]
})
export class TransactionListComponent implements OnInit, OnDestroy {
  data: Transaction[] = [];
  isLoading: boolean;
  private transaction$: Subscription;

  displayedColumns: string[] = [
    "description",
    "category",
    "date",
    "amount",
    "action"
  ];

  constructor(
    private transaction: TransactionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.transaction$.unsubscribe();
  }

  addTransaction() {
    const addTransactionDialogRef = this.dialog.open(
      AddTransactionDialogComponent
    );

    addTransactionDialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          alert("Transaction has been added!");
          this.loadTransactions();
        }
      },
      error => console.log(error)
    );
  }

  private loadTransactions() {
    this.isLoading = true;

    this.transaction$ = this.transaction.getTransactions().subscribe(
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
