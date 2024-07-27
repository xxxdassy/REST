import { ProductModel } from '../../domain/product/models/product'
import {
  AddProduct,
  ProductModelInputDto,
} from '../../domain/product/usecases/add-product'
import { AddProductReposity } from '../protocol/add-product-repository'

export class DbAddProduct implements AddProduct {
  private readonly addProductReposity: AddProductReposity
  constructor(addProductReposity: AddProductReposity) {
    this.addProductReposity = addProductReposity
  }

  async save(input: ProductModelInputDto): Promise<ProductModel> {
    const product = await this.addProductReposity.save(input)

    return product
  }
}
