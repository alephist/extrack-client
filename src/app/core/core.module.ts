import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";

import { SharedModule } from "../shared/shared.module";

import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./header/header.component";

import { ErrorInterceptor } from "./error.interceptor";

function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule,
    LayoutComponent,
    HeaderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {}
