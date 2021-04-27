import * as express from "express";
import AdminController from "../Controller/AdminController";
import Auth from "../filter/Auth";
import * as multer from "multer";
import ConstantUtil from "../utils/ConstantUtil";

const avatarUpload = multer({dest: ConstantUtil.uploadAdminProfilePath})
const foodImageUpload = multer({dest: ConstantUtil.uploadFoodImagePath})

const router = express.Router();

router.post('/HKUST/login', AdminController.adminLogin)

router.get('/HKUST/account_flow', Auth, AdminController.getAccountFlow)

router.get('/HKUST/user_flow', Auth, AdminController.getUserFlow)

router.get('/HKUST/admin_info', Auth, AdminController.getAdminInfo)

router.put('/HKUST/admin_info', Auth, AdminController.updateAdminInfo)

router.post('/HKUST/pass_validate', Auth, AdminController.validatePass)

router.put('/HKUST/pass_update', Auth, AdminController.updatePass)

router.put('/HKUST/avatar_upload', Auth, avatarUpload.any(), AdminController.updateAvatar)

router.post('/HKUST/coupon', Auth, AdminController.issueCoupon)

router.get('/HKUST/food', Auth, AdminController.getFood)

router.post('/HKUST/food', Auth, foodImageUpload.any(), AdminController.addFood)

router.put('/HKUST/food', Auth, AdminController.updateFood)

router.delete('/HKUST/food', Auth, AdminController.deleteFood)

router.get('/HKUST/food_menu', Auth, AdminController.getFoodMenu)

router.post('/HKUST/food_menu', Auth, AdminController.addFoodMenu)

router.put('/HKUST/food_menu', Auth, AdminController.updateFoodMenuNum)

router.delete('/HKUST/food_menu', Auth, AdminController.deleteFoodMenu)

router.post('/HKUST/food_menu/duplicate', Auth, AdminController.addHasDuplicateFoodMenu)

export default router;