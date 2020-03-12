import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { environment } from "./../../environments/environment";

interface User {
  id?: number;
  name_id?: number;
  unique_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authUrl: string = `${environment.baseUrl}/api/auth`;
  private user = new BehaviorSubject<User>(null);
  currentUser = this.user.asObservable();

  constructor(private http: HttpClient) {}

  register({ username, email, password }: User) {
    return this.http.post(`${this.authUrl}/register`, {
      username,
      email,
      password
    });
  }
}
