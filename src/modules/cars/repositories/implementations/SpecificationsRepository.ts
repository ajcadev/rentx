import { Specification } from '../../models/Specification'
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
	private specifications: Specification[]
	private static INSTANCE: SpecificationsRepository

	private constructor() {
		this.specifications = []
	}

	list(): Specification[] {
		return this.specifications
	}

	findByName(name: string): Specification | undefined {
		const specification = this.specifications.find((specification) => specification.name === name)
		return specification
	}

	public static getInstance(): SpecificationsRepository {
		if (!SpecificationsRepository.INSTANCE) {
			SpecificationsRepository.INSTANCE = new SpecificationsRepository()
		}
		return SpecificationsRepository.INSTANCE
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification = new Specification()
		Object.assign(specification, { name, description, created_at: new Date() })
		this.specifications.push(specification)
	}
}
export { SpecificationsRepository }
