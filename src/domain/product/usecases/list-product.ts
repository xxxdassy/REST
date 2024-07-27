import { ProductModel } from "../models/product";

export interface ListProduct {
  list(): Promise<ProductModel[]>
}