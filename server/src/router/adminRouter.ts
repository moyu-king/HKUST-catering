import * as express from "express";
import AdminController from "../Controller/AdminController";

const router = express.Router();

router.post('/HKUST/login', AdminController.adminLogin)

router.get('/HKUST/account_flow', AdminController.getAccountFlow)

router.get('/HKUST/user_flow', AdminController.getUserFlow)

router.get('/HKUST/admin_info', AdminController.getAdminInfo)

router.post('/HKUST/pass_validate', AdminController.validatePass)

router.put('/HKUST/pass_modify', AdminController.modifyPass)

router.post('/HKUST/coupon_issue', AdminController.issueCoupon)

router.get('/HKUST/food_menu', AdminController.getFoodData)

router.post('/HKUST/new_food', AdminController.addNewFood)

export default router;