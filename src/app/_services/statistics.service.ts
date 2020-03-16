import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { ChartData } from "./../_models/chartData.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getStatisticsByCategory() {
    return this.http.get<ChartData[]>(
      this.createStatisticsRoute(this.auth.currentUser.id)
    );
  }

  private createStatisticsRoute(id: number): string {
    return `${environment.baseUrl}/api/users/${id}/statistics`;
  }
}
