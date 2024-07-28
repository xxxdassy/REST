import { AddProduct } from '../../../domain/product/usecases/add-product'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddProductController implements Controller {
  private addProduct: AddProduct

  constructor(addProduct: AddProduct) {
    this.addProduct = addProduct
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'price', 'quantity']

      for (const fields of requiredFields) {
        if (!httpRequest.body[fields]) {
          return badRequest(new MissingParamError(fields))
        }
      }

      const { name, price, quantity } = httpRequest.body

      const product = await this.addProduct.save({ name, price, quantity })

      return ok(product)
    } catch (error) {
      return serverError()
    }
  }
}
