import { prisma } from '../../infra/db/prisma/helpers/prisma'
import { ListProductController } from '../../presentation/controllers/product/list-products'
import { DbListProduct } from '../../data/usecases/list-products'
import { ListProductRepositoryPrisma } from '../../infra/db/prisma/product-repository/list-product.repository.prisma'

export const makeListProductController = (): ListProductController => {
  const listProductRepositoryPrisma = new ListProductRepositoryPrisma(prisma)
  const dbListProduct = new DbListProduct(listProductRepositoryPrisma)
  const listProductController = new ListProductController(dbListProduct)

  return listProductController
}
