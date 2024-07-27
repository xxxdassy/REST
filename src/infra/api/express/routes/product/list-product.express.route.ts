import { Request, Response } from "express";
import { ListProductOutputDto, ListProductUsecase } from "../../../../../usecases/list-product/list-product.usecase";
import { HttpMethod, Route } from "../route";
import { DbListProduct } from "../../../../../data/usecases/list-products";
import { ProductModel } from "../../../../../domain/product/models/product";

export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
  }[]
}

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: DbListProduct
  ) {}

  public static create(listProductService: DbListProduct) {
    return new ListProductRoute(
      "/product",
      HttpMethod.GET,
      listProductService
    )
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductService.list()

      const responseBody = this.present(output)

      response.status(200).json(responseBody).send()
    }
  }

public getPath(): string {
    return this.path
}

public getMethod(): HttpMethod {
  return this.method
}

  

  private present(input: ProductModel[]): ListProductResponseDto {
    const response = {
      products: input.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }))
    }

    return response
  }
}