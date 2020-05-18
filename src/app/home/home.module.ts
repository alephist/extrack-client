import { NgModule } from "@angular/core";

import { HomeRouterModule } from "./home-router.module";
import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./home.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@NgModule({
  declarations: [HomeComponent, LoginFormComponent, RegisterFormComponent],
  imports: [SharedModule, HomeRouterModule]
})
export class HomeModule {}
