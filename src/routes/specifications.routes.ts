import { Router } from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ImportSpecificationController } from '../modules/cars/useCases/importSpecification/ImportSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController'

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const importSpecificationController = new ImportSpecificationController()
const listSpecificationsController = new ListSpecificationsController()
const upload = multer({ dest: './tmp' })

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)
specificationsRoutes.post('/import', upload.single('file'), importSpecificationController.handle)
specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
