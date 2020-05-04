import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { JwtModule } from "@auth0/angular-jwt";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

import { MaterialModule } from "./material.module";
import { AppRouterModule } from "./app-router.module";

import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";

import { HeaderComponent } from "./navigation/header/header.component";
import { SidebarListComponent } from "./navigation/sidebar-list/sidebar-list.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PieChartComponent } from "./dashboard/pie-chart/pie-chart.component";

import { CategoryListComponent } from "./category/category-list/category-list.component";
import { AddCategoryDialogComponent } from "./category/add-category-dialog/add-category-dialog.component";
import { UpdateCategoryDialogComponent } from "./category/update-category-dialog/update-category-dialog.component";

import { TransactionListComponent } from "./transaction/transaction-list/transaction-list.component";
import { AddTransactionDialogComponent } from "./transaction/add-transaction-dialog/add-transaction-dialog.component";
import { UpdateTransactionCatalogComponent } from "./transaction/update-transaction-catalog/update-transaction-catalog.component";

import { HomeComponent } from "./home/home.component";
import { LoginFormComponent } from "./home/login-form/login-form.component";
import { RegisterFormComponent } from "./home/register-form/register-form.component";

import { AccountComponent } from "./account/account.component";

import { ErrorInterceptor } from "./error.interceptor";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarListComponent,
    CategoryListComponent,
    AddCategoryDialogComponent,
    UpdateCategoryDialogComponent,
    TransactionListComponent,
    AddTransactionDialogComponent,
    UpdateTransactionCatalogComponent,
    DashboardComponent,
    PieChartComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxChartsModule,
    AppRouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: "top",
        horizontalPosition: "center"
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
