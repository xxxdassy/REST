import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";

/*
  E importante entender que o modelo do banco de dados e diferente da nossa entidade,
  nunca salve a entidade diretamente, o que vai para o banco de dados sao dados,
  bem como em nossa aplicacao o que vai ser manipulado sao as entidades e seus
  dados.
*/


export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  public async save(product: Product): Promise<void> {
    /*
      Aqui vai haver uma conversao de modelo entidade para modelo prisma
    */
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }

    await this.prismaClient.product.create({
      data,
    })
  }
  public async list(): Promise<Product[]> {
    /*
      Aqui vai haver uma conversao de modelo prisma para modelo de entidade
    */
    const products = await this.prismaClient.product.findMany()

    const productList = products.map(p => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })

      return product
    })

    return productList
  }
}