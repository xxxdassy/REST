import { ProductModel } from "../../domain/product/models/product";

export interface ListProductReposity {
  list(): Promise<ProductModel[]>
}