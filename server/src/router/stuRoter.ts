import * as express from "express";
import StuController from "../Controller/StuController";

const router = express.Router();

router.get("/user/index", StuController.getIndexData);

export default router;