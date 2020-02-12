import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MaterialModule } from "./material.module";

import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidebarListComponent } from "./navigation/sidebar-list/sidebar-list.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarListComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
