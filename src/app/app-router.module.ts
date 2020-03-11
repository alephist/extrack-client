import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginFormComponent } from "./home/login-form/login-form.component";
import { RegisterFormComponent } from "./home/register-form/register-form.component";

import { AccountComponent } from "./account/account.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TransactionListComponent } from "./transaction/transaction-list/transaction-list.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: LoginFormComponent },
      { path: "register", component: RegisterFormComponent }
    ]
  },
  {
    path: "account",
    component: AccountComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "categories", component: CategoryListComponent },
      { path: "transactions", component: TransactionListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
