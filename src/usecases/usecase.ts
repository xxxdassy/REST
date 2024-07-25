// essa e a porta de entrada que a camada verde vai utilizar para acessar os casos de uso
export interface Usecase<InputDto, OutputDto> {
  execute(input: InputDto): Promise<OutputDto>
}