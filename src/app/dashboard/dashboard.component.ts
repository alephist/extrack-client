import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ChartData } from "./../_models/chartData.model";
import { Transaction } from "../_models/transaction.model";
import { StatisticsService } from "./../_services/statistics.service";

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
  private dashboardSub: Subscription;

  constructor(private statistics: StatisticsService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.dashboardSub = this.statistics.getStatisticsByCategory().subscribe(
      res => {
        this.data = res.chartData;
        this.recentTransactions = res.recentTransactions;
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
