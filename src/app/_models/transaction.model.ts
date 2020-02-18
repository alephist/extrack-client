import { Category } from "./category.model";

export interface Transaction {
  id: number;
  description: string;
  date: Date;
  amount: number;
  categoryId?: number;
  category?: Category;
}
