import { ChartData } from "./chartData.model";
import { Transaction } from "./transaction.model";

export interface Statistics {
  chartData: ChartData[];
  recentTransactions: Transaction[];
}
