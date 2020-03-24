import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { SidenavService } from "./../../_services/sidenav.service";
import { AuthService } from "./../../_services/auth.service";
import { SnackbarService } from "./../../_services/snackbar.service";
import { User } from "src/app/_models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  private sidenavIsOpen: boolean = true;
  user$: Observable<User>;

  constructor(
    private sidenav: SidenavService,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  logoutUser() {
    this.auth.logout();
    this.snackbar.info("User has logged out");
    this.router.navigate(["/"]);
  }

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenav.changeStatus(this.sidenavIsOpen);
  }
}
