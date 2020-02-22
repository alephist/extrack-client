import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { StatisticsService } from "./../_services/statistics.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private statistics$: Subscription;

  constructor(private statistics: StatisticsService) {}

  ngOnInit(): void {
    this.statistics$ = this.statistics.getStatisticsByCategory().subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.statistics$.unsubscribe();
  }
}
