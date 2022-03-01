import { Category } from '../../models/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
	private categories: Category[]
	private static INSTANCE: CategoriesRepository

	private constructor() {
		this.categories = []
	}

	list(): Category[] {
		return this.categories
	}

	findByName(name: string): Category | undefined {
		const category = this.categories.find((category) => category.name === name)
		return category
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository()
		}
		return CategoriesRepository.INSTANCE
	}

	create({ name, description }: ICreateCategoryDTO): void {
		const category = new Category()
		Object.assign(category, { name, description, created_at: new Date() })
		this.categories.push(category)
	}
}
export { CategoriesRepository }
