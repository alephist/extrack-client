import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SidenavService {
  private sidenavStatus = new BehaviorSubject<boolean>(true);
  isOpen = this.sidenavStatus.asObservable();

  constructor() {}

  changeStatus(status: boolean): void {
    this.sidenavStatus.next(status);
  }
}
