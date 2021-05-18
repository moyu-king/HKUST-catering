import * as express from "express";
import StudentController from "../Controller/StudentController";
import StudentAuth from "../filter/StudentAuth";

const router = express.Router();

router.post("/login", StudentController.login);

router.post("/register", StudentController.register)

router.get("/user_info", StudentAuth, StudentController.getUserInfo);

router.put("/user_info", StudentAuth, StudentController.updateUserInfo)

router.get("/food", StudentController.getFoods)

router.get("/issue-coupons", StudentController.getIssueCoupon)

router.get('/student-coupons', StudentAuth, StudentController.getStudentCoupon)

router.post('/student_coupons', StudentAuth, StudentController.addCoupon)

router.get('/student-payment-pass/exist', StudentAuth, StudentController.isStudentPaymentExist)

router.post('/student-payment-pass/validate', StudentAuth, StudentController.validatePaymentPass)

router.put('/student-payment-pass/update', StudentAuth, StudentController.updatePaymentPass)

router.get('/order/type', StudentController.getOrderType)

router.put('/student-wallet', StudentAuth, StudentController.updateStudentWallet)

router.get('/order', StudentAuth, StudentController.getOrder)

export default router;
