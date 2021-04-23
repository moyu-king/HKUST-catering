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

router.post('/HKUST/coupon_issue', Auth, AdminController.issueCoupon)

router.get('/HKUST/food_menu', Auth, AdminController.getFoodData)

router.post('/HKUST/food_add', Auth, foodImageUpload.any(), AdminController.addNewFood)

export default router;