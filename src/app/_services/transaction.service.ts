import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Transaction } from "../_models/transaction.model";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  private transactionUrl: string = `${environment.baseUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }

  addTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(this.transactionUrl, transaction);
  }

  updateTransaction(transaction: Transaction) {
    return this.http.put(`${this.transactionUrl}/${transaction.id}`, {
      description: transaction.description,
      date: transaction.date,
      amount: transaction.amount,
      categoryId: transaction.categoryId
    });
  }
}
