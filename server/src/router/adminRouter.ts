import * as express from "express";
import AdminController from "../Controller/AdminController";

const router = express.Router();

router.get("/hzz/index", AdminController.getIndexData)

export default router;