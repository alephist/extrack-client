import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Transaction } from "./../../_models/transaction.model";
import { TransactionService } from "./../../_services/transaction.service";

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

  constructor(private transaction: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.transaction$.unsubscribe();
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
