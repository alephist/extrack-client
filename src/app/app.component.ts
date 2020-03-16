import { Component, OnInit } from "@angular/core";

import { AuthService } from "./_services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const token: string = localStorage.getItem("token");

    if (token) {
      this.auth.handleToken(token);
    }
  }
}
