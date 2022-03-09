import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license }: ICreateUserDTO = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)
    await createUserUseCase.execute({ name, password, email, driver_license })
    return response.status(201).send()
  }
}
export { CreateUserController }
