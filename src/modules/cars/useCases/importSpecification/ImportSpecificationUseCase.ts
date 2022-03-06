import { parse } from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IImportSpecification {
  name: string
  description: string
}

@injectable()
class ImportSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  loadSpecifications(file: Express.Multer.File): Promise<IImportSpecification[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const specifications: IImportSpecification[] = []
      const parseFile = parse()
      stream.pipe(parseFile)
      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          specifications.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(specifications)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File) {
    const specifications = await this.loadSpecifications(file)
    specifications.forEach(async (specification) => {
      const { name, description } = specification
      const existSpecification = await this.specificationsRepository.findByName(name)
      if (!existSpecification) {
        await this.specificationsRepository.create({ name, description })
      }
    })
  }
}
export { ImportSpecificationUseCase }
