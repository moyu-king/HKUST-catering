import AdminService from "../service/AdminService";
import AdminServiceImpl from "../service/impl/AdminServiceImpl";
import HttpUtil from '../utils/HttpUtil'
import LoginEnum from "../enum/LoginEnum";
import ConstantUtil from "../utils/ConstantUtil";
import CouponService from "../service/CouponService";
import CouponServiceImpl from "../service/impl/CouponServiceImpl";
import FoodService from "../service/FoodService";
import FoodServiceImpl from "../service/impl/FoodServiceImpl";
import Admin from "../model/Admin";
import Food from "../model/Food";
import FoodMenuService from "../service/FoodMenuService";
import FoodMenuServiceImpl from "../service/impl/FoodMenuServiceImpl";
import FoodMenu from "../model/FoodMenu";
import OperateEnum from "../enum/OperateEnum";

class AdminController {
    public static async adminLogin(req: any, res: any): Promise<void> {
        const {username, password} = req.body
        const adminService: AdminService = new AdminServiceImpl()

        const result: LoginEnum | string = await adminService.login(username, password)

        switch (result) {
            case LoginEnum.serverErr:
                res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
                break
            case LoginEnum.usernameErr:
                res.send(HttpUtil.resBody(0, '用户名不存在！', ''))
                break
            case LoginEnum.passwordErr:
                res.send(HttpUtil.resBody(0, '密码错误！', ''))
                break
            default:
                res.send(HttpUtil.resBody(1, '登录成功！', {token: result}))
                break
        }
    }

    public static async getAccountFlow(req: any, res: any): Promise<void> {
        const date: number = req.query.date

        const adminService: AdminService = new AdminServiceImpl()
        const result: any = await adminService.getAccountFlow(date)

        if (result) {
            res.send(HttpUtil.resBody(1, 'success', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getUserFlow(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async getAdminInfo(req: any, res: any): Promise<void> {
        const username = req.currentUsername

        const adminService: AdminService = new AdminServiceImpl()
        const admin: Admin = await adminService.getAdminInfo(username)

        if (admin) {
            res.send(HttpUtil.resBody(1, 'success', {
                shop_name: admin.shop_name,
                alias: admin.alias,
                phone: admin.phone,
                address: admin.address,
                username: admin.username,
                avatar: admin.avatar
            }))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async validatePass(req: any, res: any): Promise<void> {
        const password: string = req.body.password
        const username: string = req.currentUsername

        const adminService: AdminService = new AdminServiceImpl()
        const result: boolean = await adminService.validatePass(username, password)
        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, '密码错误！', ''))
        }
    }

    public static async updateAvatar(req: any, res: any) {
        const username: string = req.currentUsername
        const {originalname, destination, path} = req.files[0]

        const adminService: AdminService = new AdminServiceImpl()
        const result: boolean = await adminService.updateAdminAvatar(originalname, destination, path, username)

        if (result) {
            res.send(HttpUtil.resBody(1, '上传成功！', ''))
        } else {
            res.send(HttpUtil.resBody(0, '上传失败', ''),)
        }
    }

    public static async updatePass(req: any, res: any): Promise<void> {
        const username: string = req.currentUsername
        const password: string = req.body.password

        const adminService: AdminService = new AdminServiceImpl()
        const result: boolean = await adminService.updatePass(username, password)
        if (result) {
            res.send(HttpUtil.resBody(1, '修改成功！', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async issueCoupon(req: any, res: any): Promise<void> {
        const {title, discount, expireIn, create_time} = req.body
        const limit: number = Number(req.body.limit)
        const couponService: CouponService = new CouponServiceImpl()

        const result: boolean = await couponService.issueCoupon(title, discount, limit, create_time, expireIn)
        if (result) {
            res.send(HttpUtil.resBody(1, '优惠券发行成功！', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getFood(req: any, res: any): Promise<void> {
        const foodService: FoodService = new FoodServiceImpl()
        const foods: Food[] | boolean = await foodService.getFoodData()
        if (foods) {
            res.send(HttpUtil.resBody(1, 'ok', foods as Food[]))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async updateAdminInfo(req: any, res: any): Promise<void> {
        const admin = new Admin()
        admin.username = req.currentUsername
        admin.shop_name = req.body.shop_name
        admin.phone = req.body.phone
        admin.alias = req.body.alias
        admin.address = req.body.address

        const adminService: AdminService = new AdminServiceImpl()
        const result: boolean = await adminService.updateAdminInfo(admin)
        if (result) {
            res.send(HttpUtil.resBody(1, '信息修改成功！', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async addFood(req: any, res: any): Promise<void> {
        const {food_name, price, type, description} = req.body
        const {destination, path, filename} = req.files[0]
        const foodService: FoodService = new FoodServiceImpl()
        const result: boolean = await foodService.addFood(food_name, price, type, description, destination, path, filename)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async deleteFood(req: any, res: any): Promise<void> {
        const food_id: string = req.query.food_id
        const foodService: FoodService = new FoodServiceImpl()

        const result: boolean = await foodService.deleteFood(food_id)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async updateFood(req: any, res: any): Promise<void> {
        const {food_name, price, type, food_id} = req.body
        const foodService: FoodService = new FoodServiceImpl()

        const result: boolean = await foodService.updateFood(food_name, price, type, food_id)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getFoodMenu(req: any, res: any): Promise<void> {
        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
        const foodMenu: boolean | FoodMenu[] = await foodMenuService.getFoodMenu()

        if (foodMenu) {
            res.send(HttpUtil.resBody(1, 'ok', foodMenu as FoodMenu[]))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async addFoodMenu(req: any, res: any): Promise<void> {
        const number: number = req.body.number * 1
        const date: number = req.body.date * 1
        const foods_id: string[] = req.body.foods_id
        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()

        const result: boolean | any[] = await foodMenuService.addFoodMenu(foods_id, number, date)
        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async updateFoodMenuNum(req: any, res: any): Promise<void> {
        const food_menu_id: string = req.body.food_menu_id
        const number: number = Number(req.body.number)
        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
        const result: boolean = await foodMenuService.updateFoodMenuNum(number, food_menu_id)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async deleteFoodMenu(req: any, res: any): Promise<void> {
        const food_menu_id: string = req.query.food_menu_id
        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
        const result: boolean = await foodMenuService.deleteFoodMenu(food_menu_id)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async addHasDuplicateFoodMenu(req: any, res: any): Promise<void> {
        const operate: number = req.body.operate ?? OperateEnum.add
        const foods_id: string[] = req.body.foods_id
        const date: number = req.body.date
        const number: number = req.body.number

        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
        const result: any[] | boolean = await foodMenuService.addHasDuplicateFoodMenu(foods_id, number, date, operate)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }
}

export default AdminController;