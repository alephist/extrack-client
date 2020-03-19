import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { Statistics } from "../_models/statistics.model";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getStatisticsByCategory() {
    return this.http.get<Statistics>(
      this.createStatisticsRoute(this.auth.currentUser.id)
    );
  }

  private createStatisticsRoute(id: number): string {
    return `${environment.baseUrl}/api/users/${id}/statistics`;
  }
}
