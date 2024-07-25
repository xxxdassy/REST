export type ProductProps = {
  id: string
  name: string
  price: number
  quantity: number
}

export class Product {
  /*
    Ao deixar o construtor como privado nao sera possivel instanciar essa classe.
    Ao deixar os atributos como privado nao sera necessario declarar os atributos
    da classe com os dados que vem do construtor
  */
  private constructor(private props: ProductProps) {}

  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID(),
      name,
      price,
      quantity: 0
    })
  }

  public static with(props: ProductProps) {
    return new Product(props)
  }

  /*
    Nao teremos setters pois uma entidade tem que ser rica onde ela tem uma regra
    de negocio, e ela nao seja um armazenador de dados.
  */

  public get id() {
    return this.props.id
  }

  public get name() {
    return this.props.name
  }

  public get price() {
    return this.props.price
  }

  public get quantity() {
    return this.props.quantity
  }

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity
  }
  
  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity
  }
}