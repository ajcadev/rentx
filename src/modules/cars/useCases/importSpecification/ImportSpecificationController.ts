import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportSpecificationUseCase } from './ImportSpecificationUseCase'

class ImportSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request
    const importSpecificationUseCase = container.resolve(ImportSpecificationUseCase)
    await importSpecificationUseCase.execute(file as Express.Multer.File)
    return response.status(201).send()
  }
}
export { ImportSpecificationController }
