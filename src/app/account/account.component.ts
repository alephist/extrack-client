import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { SidenavService } from "../_services/sidenav.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  isOpen$: Observable<boolean>;

  constructor(private sidenav: SidenavService) {}

  ngOnInit(): void {
    this.isOpen$ = this.sidenav.isOpen;
  }
}
