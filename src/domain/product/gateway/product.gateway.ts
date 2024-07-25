/*
  O gateway vai ser uma interface de saida dos dados para fora do domain, para
  um banco de dados por exemplo, isso significa que ele vai descrever os metodos
  que vao residir na camada verde atravez de contratos, atravez do principios de
  solid como Liskov and Interface segregation.
*/

import { Product } from "../entity/product.entity";

export interface ProductGateway {
  // vamos usar esse para salvar uma entidade no banco de dados por exemplo
  save(product: Product): Promise<void>
  list(): Promise<Product[]>
}