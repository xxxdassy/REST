import { prisma } from '../infra/db/prisma/helpers/prisma'

// vamos garantir que o app.listen vai ser executado apos o prisma conectar.

prisma
  .$connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(5050, () => {
      console.log('Server running at http://localhost:5050')
    })
  })
  .catch(console.error)
