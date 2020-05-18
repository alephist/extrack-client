import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

const homeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: LoginFormComponent },
      { path: "register", component: RegisterFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRouterModule {}
