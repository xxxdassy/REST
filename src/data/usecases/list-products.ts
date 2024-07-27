import { ProductModel } from "../../domain/product/models/product";
import { ListProduct } from "../../domain/product/usecases/list-product";
import { ListProductReposity } from "../protocol/list-product-repository";

export class DbListProduct implements ListProduct {
  private readonly listProductRepository: ListProductReposity

  constructor(listProductRepository: ListProductReposity) {
    this.listProductRepository = listProductRepository
  }

  async list(): Promise<ProductModel[]> {
    const products = await this.listProductRepository.list()

    return products
  }
}