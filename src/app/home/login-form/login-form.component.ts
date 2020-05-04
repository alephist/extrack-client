import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./../../_services/auth.service";
import { SnackbarService } from "./../../_services/snackbar.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoginForm();
  }

  loginUser() {
    this.auth.login(this.loginForm.value).subscribe(
      () => {
        this.snackbar.success("Login Successful!");
        this.router.navigate(["/account"]);
      },
      error => {
        this.snackbar.error(error);
        console.log(error);
      },
      () => this.loginForm.reset()
    );
  }

  goToRegisterPage() {
    this.router.navigate(["/register"]);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  private loadLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }
}
