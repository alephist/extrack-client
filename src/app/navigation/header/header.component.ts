import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { SidenavService } from "./../../_services/sidenav.service";
import { AuthService } from "./../../_services/auth.service";
import { User } from "src/app/_models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  private sidenavIsOpen: boolean = true;
  user$: Observable<User>;

  constructor(private sidenav: SidenavService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUser;
  }

  logoutUser() {
    this.auth.logout();
    console.log("User has logged out!");
  }

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenav.changeStatus(this.sidenavIsOpen);
  }
}
