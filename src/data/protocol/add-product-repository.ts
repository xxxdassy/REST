import { ProductModel } from '../../domain/product/models/product'
import { ProductModelInputDto } from '../../domain/product/usecases/add-product'

export interface AddProductReposity {
  save(input: ProductModelInputDto): Promise<ProductModel>
}
