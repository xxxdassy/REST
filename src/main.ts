import { DbAddProduct } from './data/usecases/add-products'
import { DbListProduct } from './data/usecases/list-products'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductRoute } from './infra/api/express/routes/product/create-product.express.route'
import { ListProductRoute } from './infra/api/express/routes/product/list-product.express.route'
import { ProductRepositoryPrisma } from './infra/db/prisma/add-product.repository.prisma'
import { prisma } from './package/prisma/prisma'

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma)

  const createProductUsecase = new DbAddProduct(aRepository)
  const listProductUsecase = new DbListProduct(aRepository)

  const createProductRoute = CreateProductRoute.create(createProductUsecase)
  const listProductRoute = ListProductRoute.create(listProductUsecase)

  const port = 8000

  const api = ApiExpress.create([createProductRoute, listProductRoute])

  api.start(port)
}

main()
