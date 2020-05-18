import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountComponent } from "./account.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { TransactionListComponent } from "./transaction/transaction-list/transaction-list.component";

const accountRoutes: Routes = [
  {
    path: "",
    component: AccountComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "categories", component: CategoryListComponent },
      { path: "transactions", component: TransactionListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AccountRouterModule {}
