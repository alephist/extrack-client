import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse) {
    // Catch 401 error
    if (err.status === 401) {
      return throwError(err.statusText);
    }

    // Catch 404 or 500 error
    if (err.status === 404 || err.status === 500) {
      return throwError(err.error);
    }

    // Catch 400 error
    if (err.status === 400) {
      return this.handle400Error(err);
    }

    return throwError("Unknown error occured!");
  }

  private handle400Error(err: HttpErrorResponse) {
    let serverError = err.error;
    let modelStateError: string = "";

    if (serverError.errors && typeof serverError.errors === "object") {
      for (const key in serverError.errors) {
        if (serverError.errors.hasOwnProperty(key)) {
          modelStateError += `${serverError.errors[key]}\n`;
        }
      }
    }

    return throwError(modelStateError || serverError);
  }
}
