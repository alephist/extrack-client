import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRouterModule } from "./app-router.module";
import { CoreModule } from "./core/core.module";
import { HomeModule } from "./home/home.module";
import { AccountModule } from "./account/account.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
