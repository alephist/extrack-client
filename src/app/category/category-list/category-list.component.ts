import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit {
  data = [
    { id: 1, name: "Food" },
    { id: 2, name: "Shopping" },
    { id: 3, name: "Bills" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Pets" },
    { id: 6, name: "Education" },
    { id: 7, name: "Rent" },
    { id: 8, name: "Travel" }
  ];

  constructor() {}

  ngOnInit(): void {}
}
