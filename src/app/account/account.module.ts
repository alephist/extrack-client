import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { AccountRouterModule } from "./account-router.module";
import { SharedModule } from "../shared/shared.module";

import { AccountComponent } from "./account.component";
import { SidebarListComponent } from "./sidebar-list/sidebar-list.component";

import { PieChartComponent } from "./dashboard/pie-chart/pie-chart.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { CategoryListComponent } from "./category/category-list/category-list.component";
import { AddCategoryDialogComponent } from "./category/add-category-dialog/add-category-dialog.component";
import { UpdateCategoryDialogComponent } from "./category/update-category-dialog/update-category-dialog.component";

import { AddTransactionDialogComponent } from "./transaction/add-transaction-dialog/add-transaction-dialog.component";
import { TransactionListComponent } from "./transaction/transaction-list/transaction-list.component";
import { UpdateTransactionCatalogComponent } from "./transaction/update-transaction-catalog/update-transaction-catalog.component";

@NgModule({
  declarations: [
    AccountComponent,
    SidebarListComponent,
    PieChartComponent,
    DashboardComponent,
    CategoryListComponent,
    AddCategoryDialogComponent,
    UpdateCategoryDialogComponent,
    AddTransactionDialogComponent,
    TransactionListComponent,
    UpdateTransactionCatalogComponent
  ],
  imports: [SharedModule, NgxChartsModule, AccountRouterModule]
})
export class AccountModule {}
