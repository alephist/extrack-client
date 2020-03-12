import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "./../../_services/auth.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private registerSub: Subscription;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadRegisterForm();
  }

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

  registerUser() {
    this.registerSub = this.auth.register(this.registerForm.value).subscribe(
      () => console.log("Registration successful!"),
      error => console.log(error),
      () => this.registerForm.reset()
    );
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
