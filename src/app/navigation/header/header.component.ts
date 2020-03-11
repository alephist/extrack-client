import { Component, OnInit } from "@angular/core";

import { SidenavService } from "./../../_services/sidenav.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  private sidenavIsOpen: boolean = true;

  constructor(private sidenav: SidenavService) {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenav.changeStatus(this.sidenavIsOpen);
  }
}
