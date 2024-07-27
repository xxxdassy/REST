import { ProductModel } from "../models/product"

export interface ProductModelInputDto {
  name: string
  price: number
  quantity: number
}

export interface AddProduct {
  save(input: ProductModelInputDto): Promise<ProductModel>
}