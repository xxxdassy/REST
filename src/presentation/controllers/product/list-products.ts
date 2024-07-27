
import { ListProduct } from "../../../domain/product/usecases/list-product";
import { ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class ListProductController implements Controller {
  private listProduct: ListProduct

  constructor(listProduct: ListProduct) {
    this.listProduct = listProduct
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.listProduct.list()

      return ok(products)
    } catch (error) {
      return serverError()
    }
  }
}