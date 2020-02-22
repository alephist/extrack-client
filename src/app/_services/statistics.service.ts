import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { ChartData } from "./../_models/chartData.model";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  private statisticsUrl: string = `${environment.baseUrl}/api/statistics`;

  constructor(private http: HttpClient) {}

  getStatisticsByCategory() {
    return this.http.get<ChartData[]>(this.statisticsUrl);
  }
}
