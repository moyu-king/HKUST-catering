import * as express from "express";
import StudentController from "../Controller/StudentController";
import StudentAuth from "../filter/StudentAuth";

const router = express.Router();

router.post("/app/login", StudentController.login);

router.post("/app/register", StudentController.register)

router.get("/app/user_info", StudentAuth, StudentController.getUserInfo);

router.put("/app/user_info", StudentAuth, StudentController.updateUserInfo)

export default router;