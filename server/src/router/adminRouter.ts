import * as express from 'express'
import AdminController from '../Controller/AdminController'
import Auth from '../filter/Auth'
import * as multer from 'multer'
import ConstantUtil from '../utils/ConstantUtil'

const avatarUpload = multer({dest: ConstantUtil.uploadAdminProfilePath})
const foodImageUpload = multer({dest: ConstantUtil.uploadFoodImagePath})

const router = express.Router()

router.post('/login', AdminController.adminLogin)

router.get('/account_flow', Auth, AdminController.getAccountFlow)

router.get('/user_flow', Auth, AdminController.getUserFlow)

router.get('/admin_info', Auth, AdminController.getAdminInfo)

router.put('/admin_info', Auth, AdminController.updateAdminInfo)

router.post('/pass_validate', Auth, AdminController.validatePass)

router.put('/pass_update', Auth, AdminController.updatePass)

router.put('/avatar_upload', Auth, avatarUpload.any(), AdminController.updateAvatar)

router.post('/coupon', Auth, AdminController.issueCoupon)

router.get('/food', Auth, AdminController.getFood)

router.post('/food', Auth, foodImageUpload.any(), AdminController.addFood)

router.put('/food', Auth, AdminController.updateFood)

router.delete('/food', Auth, AdminController.deleteFood)

router.get('/food_menu', Auth, AdminController.getFoodMenu)

router.post('/food_menu', Auth, AdminController.addFoodMenu)

router.put('/food_menu', Auth, AdminController.updateFoodMenuNum)

router.delete('/food_menu', Auth, AdminController.deleteFoodMenu)

router.post('/food_menu/duplicate', Auth, AdminController.addHasDuplicateFoodMenu)

router.get('/outstanding-order', Auth, AdminController.getOutstandingOrder)

router.get('/order_search', AdminController.getOrders)

export default router