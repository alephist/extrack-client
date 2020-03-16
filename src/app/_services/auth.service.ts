import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from "./../../environments/environment";
import { User } from "../_models/user.model";

interface DecodedToken {
  nameid: number;
  unique_name: string;
  nbf: number;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authUrl: string = `${environment.baseUrl}/api/auth`;
  private userSubject = new BehaviorSubject<User>(null);
  user = this.userSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public get currentUser(): User {
    return this.userSubject.value;
  }

  register({ username, email, password }: User) {
    return this.http.post(`${this.authUrl}/register`, {
      username,
      email,
      password
    });
  }

  login({ email, password }: User) {
    return this.http
      .post<{ token: string }>(`${this.authUrl}/login`, { email, password })
      .pipe(
        map(res => {
          localStorage.setItem("token", res.token);
          this.handleToken(res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token: string = localStorage.getItem("token");

    return token && !this.jwtHelper.isTokenExpired(token);
  }

  handleToken(token: string) {
    let { nameid, unique_name }: DecodedToken = this.jwtHelper.decodeToken(
      token
    );
    this.userSubject.next({ id: nameid, username: unique_name });
  }
}
