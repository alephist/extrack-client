import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Transaction } from "../_models/transaction.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getTransactions() {
    return this.http.get<Transaction[]>(
      this.createTransactionRoute(this.auth.currentUser.id)
    );
  }

  addTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(
      this.createTransactionRoute(this.auth.currentUser.id),
      transaction
    );
  }

  updateTransaction(transaction: Transaction) {
    return this.http.put(
      this.createTransactionRoute(this.auth.currentUser.id, transaction.id),
      {
        description: transaction.description,
        date: transaction.date,
        amount: transaction.amount,
        categoryId: transaction.categoryId
      }
    );
  }

  deleteTransaction(id: number) {
    return this.http.delete(
      this.createTransactionRoute(this.auth.currentUser.id, id)
    );
  }

  private createTransactionRoute(userId: number, id?: number): string {
    if (id) {
      return `${environment.baseUrl}/api/users/${userId}/transactions/${id}`;
    }

    return `${environment.baseUrl}/api/users/${userId}/transactions`;
  }
}
