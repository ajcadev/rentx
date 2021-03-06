import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: { name: string; email: string }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }
    // gerei o hash aqui: https://www.md5hashgenerator.com/
    const token = sign({}, '06ae166de27aa4a0c7c5df7fbad39c50', { subject: user.id, expiresIn: '1d' })
    const tokenReturn: IResponse = { token, user: { name: user.name, email: user.email } }
    return tokenReturn
  }
}
export { AuthenticateUserUseCase }
