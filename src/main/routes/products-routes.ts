import { Router } from 'express'
import { makeAddProductController } from '../factories/add-product'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListProductController } from '../factories/list-product'

export default (router: Router) => {
  router.post('/product', adaptRoute(makeAddProductController()))
  router.get('/product', adaptRoute(makeListProductController()))
}
