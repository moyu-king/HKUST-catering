import AdminService from '../AdminService'
import AdminDao from '../../dao/AdminDao'
import AdminDaoImpl from '../../dao/impl/AdminDaoImpl'
import LoginEnum from "../../enum/LoginEnum"
import JWTUtil from "../../utils/JWTUtil"
import Admin from "../../model/Admin"

class AdminServiceImpl implements AdminService {
    private adminDao: AdminDao

    constructor() {
        this.adminDao = new AdminDaoImpl()
    }

    async addNewFood(name: string, type: string, price: number): Promise<any> {
        return Promise.resolve(undefined)
    }

    async getAccountFlow(date: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getAdminInfo(username: string): Promise<Admin> {
        return await this.adminDao.findByUsername(username).catch(() => null)
    }

    async getFoodData(): Promise<any> {
        return Promise.resolve(undefined)
    }

    async getUserFlow(date: number): Promise<any> {
        return Promise.resolve(undefined)
    }

    async login(username: string, password: string): Promise<LoginEnum | string> {
        try {
            const admin = await this.adminDao.findByUsername(username)
            if (!admin) {
                return LoginEnum.usernameErr
            } else if (admin.password !== password) {
                return LoginEnum.passwordErr
            } else {
                return JWTUtil.generate({username: admin.username})
            }

        } catch (e) {
            return LoginEnum.serverErr
        }

    }

    async validatePass(username: string, password: number): Promise<any> {
        return Promise.resolve(undefined)
    }

    async updatePass(username: string, password: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateAdminInfo(alias: string, phone: string, address: string, shop_name: string, username: string): Promise<boolean> {
        const admin: Admin = new Admin()
        admin.address = address
        admin.phone = phone
        admin.shop_name = shop_name
        admin.alias = alias
        admin.username = username

        return await this.adminDao.updateInfo(admin).catch(() => false)
    }

}

export default AdminServiceImpl