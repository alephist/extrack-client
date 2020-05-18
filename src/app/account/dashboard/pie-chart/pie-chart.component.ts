import { Component, OnInit, Input } from "@angular/core";

import { ChartData } from "../../../_models/chartData.model";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  @Input() inputData: ChartData[];
  pieChartData: { name: string; value: number }[] = [];
  showLabels: boolean = true;
  showAnimation: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.inputData.forEach(({ label, data }) => {
      this.pieChartData.push({ name: label, value: data });
    });
  }
}
