import { Router } from 'express'
import multer from 'multer'
import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
	return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
	return listCategoriesController.handle(request, response)
})

const upload = multer({ dest: './tmp' })
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
	return importCategoryController.handle(request, response)
})

export { categoriesRoutes }
