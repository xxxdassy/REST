import express from 'express'
import { bodyParser } from '../infra/api/express/middlewares/body-parser'
import jwt from 'jsonwebtoken'
import { authenticateJWT } from '../infra/api/express/middlewares/jwt'

const app = express()

const SECRET_KEY = process.env.SECRET_KEY

app.use(bodyParser)

const products = []
const users = []

/* BODY PARAM EXAMPLE
  O Body, como o nome diz, é o corpo da requisição que contém todos os dados que
  o Server precisa para processar a requisição com sucesso. Portanto, ele é usado
  somente em requisições que devem enviar informações, como create ou update.
*/

app.post('/product', authenticateJWT, (req, res) => {
  const { name, price } = req.body
  if (!name) {
    res.status(400).json({ message: 'Invalid Param' })
  }

  if (!price) {
    res.status(400).json({ message: 'Invalid Param' })
  }

  const product = {
    id: crypto.randomUUID(),
    name,
    price,
  }

  products.push(product)

  res.status(200).json(product)
})

/* ROUTE PARAM EXAMPLE
  Os parâmetros de rota são parâmetros inseridos na URL com as informações para 
  identificar um recurso específico para realizar uma ação, como: recuperar, 
  editar, atualizar ou excluir.

  Por exemplo:http://api.example.com/products/1
*/

app.get('/product/:id', authenticateJWT, (req, res) => {
  const { id } = req.params

  const search = products.find((product) => product.id === id)

  console.log(search)

  if (!search) {
    res.status(404).json({ message: 'not found' })
  }

  res.status(200).json(search)
})

/* QUERY PARAM(Parâmetros de consulta) EXAMPLE
  Os parâmetros de consulta também são parâmetros inseridos na URL, mas com a 
  principal diferença de que seus casos de uso estão relacionados a filtrar e 
  pesquisar informações sobre um recurso, ou mesmo paginar e ordenar os 
  resultados .
  
  Por exemplo: http://api.example.com/products?name=laptop&available=true

  Neste exemplo, o Cliente comunica ao Servidor que a solicitação é para 
  recuperar produtos com nome igual a laptop e disponível igual a verdadeiro.
*/

app.get('/product', authenticateJWT, (req, res) => {
  const { name } = req.query
  const search = products.find((product) => product.name === name)

  const { accept } = req.headers

  if (!search) {
    res.status(404).json({ message: 'not found' })
  }

  /* HEADERS EXAMPLE
  Cabeçalhos permitem enviar informações extras em uma solicitação , como tokens
  de autenticação e tipos de conteúdo.

  Por exemplo:
  Authorization: Bearer token
  Accept: application/json

  Neste exemplo, o Cliente está enviando dados extras informando não apenas suas
  credenciais para acessar um recurso, mas também um formato de resposta desejado.
*/

  if (accept.includes('text/html')) {
    res.status(200).send(`
      <p>id: ${search.id}</p>
      <p>name: ${search.name}</p>
      <p>price: ${search.price}</p>
    `)
  }

  res.status(200).json(search)
})

// JWT EXAMPLE

app.post('/register', (req, res) => {
  const { username, password } = req.body

  const user = users.find((user) => user.username === username)

  if (user) {
    res.status(400).json({ message: 'user already exists' })
  }

  users.push({
    username,
    password,
  })

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })

  res.status(201).json({ token })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find((user) => user.username === username)

  if (!user) {
    res.status(400).json({ message: 'user not exists' })
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })

  res.status(201).json({ token })
})

app.listen(5050, () => {
  console.log('Server running on port 5050')
})
