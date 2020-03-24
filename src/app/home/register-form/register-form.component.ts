import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./../../_services/auth.service";
import { SnackbarService } from "./../../_services/snackbar.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegisterForm();
  }

  registerUser() {
    this.auth.register(this.registerForm.value).subscribe(
      () => this.snackbar.success("Registration successful!"),
      error => this.snackbar.error(error),
      () => {
        this.registerForm.reset();
        this.goToLoginPage();
      }
    );
  }

  goToLoginPage() {
    this.router.navigate(["/"]);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  private loadRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }
}
