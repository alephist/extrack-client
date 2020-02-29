import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription, forkJoin } from "rxjs";
import { take } from "rxjs/operators";

import { ChartData } from "./../_models/chartData.model";
import { Transaction } from "../_models/transaction.model";
import { StatisticsService } from "./../_services/statistics.service";
import { TransactionService } from "./../_services/transaction.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: ChartData[] = [];
  recentTransactions: Transaction[] = [];
  displayedColumns: string[] = ["description", "category", "date", "amount"];
  private isLoading: boolean;
  private data$: Observable<ChartData[]>;
  private transaction$: Observable<Transaction[]>;
  private dashboardSub: Subscription;

  constructor(
    private statistics: StatisticsService,
    private transaction: TransactionService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.data$ = this.statistics.getStatisticsByCategory();
    this.transaction$ = this.transaction.getTransactions().pipe(take(5));

    this.dashboardSub = forkJoin(this.data$, this.transaction$).subscribe(
      res => {
        this.data = res[0];
        this.recentTransactions = res[1];
        console.log(res);
      },
      error => {
        console.log(error);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  ngOnDestroy(): void {
    this.dashboardSub.unsubscribe();
  }

  dashboardIsLoading(): boolean {
    return (
      !this.data.length &&
      !this.recentTransactions.length &&
      this.isLoading === true
    );
  }

  dashboardLoadingSuccess(): boolean {
    return (
      this.data.length &&
      this.recentTransactions.length &&
      this.isLoading === false
    );
  }
}
