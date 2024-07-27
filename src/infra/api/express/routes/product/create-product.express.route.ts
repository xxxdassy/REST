import { Request, Response } from "express";
import { CreateProductInputDto, CreateProductUsecase } from "../../../../../usecases/create-product/create-product.usecase";
import { HttpMethod, Route } from "../route";
import { DbAddProduct } from "../../../../../data/usecases/add-products";
import { ProductModelInputDto } from "../../../../../domain/product/usecases/add-product";

export type CreateProductResponseDto = {
  id: string;
}

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: DbAddProduct,
  ) {}

  public static create(createProductService: DbAddProduct) {
    return new CreateProductRoute(
      "/product",
      HttpMethod.POST,
      createProductService,
    )
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price, quantity } = request.body;

      const input: ProductModelInputDto = {
        name,
        price,
        quantity
      }

      const output: CreateProductResponseDto =
        await this.createProductService.save(input);
      
      const responseBody = this.present(output)

      response.status(201).json(responseBody).send()
    }
  }

  public getPath(): string {
      return this.path
  }

  public getMethod(): HttpMethod {
    return this.method
}

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = { id: input.id }

    return response
  }
}