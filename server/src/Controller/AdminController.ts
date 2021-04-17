import AdminService from "../service/AdminService";
import AdminServiceImpl from "../service/impl/AdminServiceImpl";
import HttpUtil from '../utils/HttpUtil'
import LoginEnum from "../enum/LoginEnum";
import ConstantUtil from "../utils/ConstantUtil";

class AdminController {
    public static async adminLogin(req: any, res: any): Promise<void> {
        const {username, password} = req.body
        const adminService: AdminService = new AdminServiceImpl()

        const result: LoginEnum | string = await adminService.login(username, password)

        switch (result) {
            case LoginEnum.serverErr:
                res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
                break
            case LoginEnum.usernameErr:
                res.send(HttpUtil.resBody(0, '用户名不存在！', null))
                break
            case LoginEnum.passwordErr:
                res.send(HttpUtil.resBody(0, '密码错误！', null))
                break
            default:
                res.send(HttpUtil.resBody(1, 'ok', {token: result}))
                break
        }
    }

    public static async getAccountFlow(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async getUserFlow(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async getAdminInfo(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async validatePass(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async modifyPass(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async issueCoupon(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async getFoodData(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async addNewFood(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

}

export default AdminController;