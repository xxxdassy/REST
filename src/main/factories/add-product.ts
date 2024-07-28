import { DbAddProduct } from '../../data/usecases/add-products'
import { AddProductRepositoryPrisma } from '../../infra/db/prisma/product-repository/add-product.repository.prisma'
import { AddProductController } from '../../presentation/controllers/product/add-products'
import { prisma } from '../../infra/db/prisma/helpers/prisma'

export const makeAddProductController = (): AddProductController => {
  const addProductRepositoryPrisma = new AddProductRepositoryPrisma(prisma)
  const dbAddProduct = new DbAddProduct(addProductRepositoryPrisma)
  const addProductController = new AddProductController(dbAddProduct)

  return addProductController
}
