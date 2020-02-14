import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Category } from "./../../_models/category.model";
import { CategoryService } from "./../../_services/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  // data = [
  //   { id: 1, name: "Food" },
  //   { id: 2, name: "Shopping" },
  //   { id: 3, name: "Bills" },
  //   { id: 4, name: "Entertainment" },
  //   { id: 5, name: "Pets" },
  //   { id: 6, name: "Education" },
  //   { id: 7, name: "Rent" },
  //   { id: 8, name: "Travel" }
  // ];
  data: Category[] = [];
  isLoading: boolean;
  category$: Subscription;

  displayedColumns: string[] = ["name", "action"];

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  loadCategories() {
    this.isLoading = true;

    this.category$ = this.category.getCategories().subscribe(
      res => {
        this.data = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
