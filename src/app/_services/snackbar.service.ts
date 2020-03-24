import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  confirm(message: string, action: string): Observable<void> {
    const snackbarRef = this.snackbar.open(message, action);

    return snackbarRef.onAction();
  }

  success(message: string) {
    this.snackbar.open(message, null, { panelClass: ["snackbar-success"] });
  }

  error(message: string) {
    this.snackbar.open(message, null, { panelClass: ["snackbar-error"] });
  }

  info(message: string) {
    this.snackbar.open(message);
  }
}
