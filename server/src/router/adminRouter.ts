import * as express from "express";
import AdminController from "../Controller/AdminController";
import Auth from "../filter/Auth";

const router = express.Router();

router.post('/HKUST/login', AdminController.adminLogin)

router.get('/HKUST/account_flow', Auth, AdminController.getAccountFlow)

router.get('/HKUST/user_flow', Auth, AdminController.getUserFlow)

router.get('/HKUST/admin_info', Auth, AdminController.getAdminInfo)

router.post('/HKUST/pass_validate', Auth, AdminController.validatePass)

router.put('/HKUST/pass_modify', Auth, AdminController.modifyPass)

router.post('/HKUST/coupon_issue', Auth, AdminController.issueCoupon)

router.get('/HKUST/food_menu', Auth, AdminController.getFoodData)

router.post('/HKUST/new_food', Auth, AdminController.addNewFood)

export default router;