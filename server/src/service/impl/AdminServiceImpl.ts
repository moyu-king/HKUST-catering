import AdminService from '../AdminService'
import AdminDao from '../../dao/AdminDao'
import AdminDaoImpl from '../../dao/impl/AdminDaoImpl'
import LoginEnum from "../../enum/LoginEnum"
import JWTUtil from "../../utils/JWTUtil"
import Admin from "../../model/Admin"
import * as fs from "fs";
import ConstantUtil from "../../utils/ConstantUtil";

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
        try {
            const admin: Admin = await this.adminDao.findByUsername(username)
            if (admin.avatar) {
                return admin
            } else {
                //如果头像为空，返回默认头像
                admin.avatar = `${ConstantUtil.staticDir()}/HKUST/profile/default.png`
                return admin
            }
        } catch (e) {
            return null
        }

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

    async validatePass(username: string, password: string): Promise<boolean> {
        try {
            const admin: Admin = await this.adminDao.findByUsername(username)
            return admin.password === password;
        } catch (e) {
            return false
        }
    }

    async updatePass(username: string, password: string): Promise<any> {
        return await this.adminDao.updatePassByUsername(username, password).catch(() => false)
    }

    async updateAdminInfo(admin: Admin): Promise<boolean> {
        return await this.adminDao.updateInfoByUsername(admin).catch(() => false)
    }

    async updateAdminAvatar(originalname: string, destination: string, path: string, username: string): Promise<boolean> {
        const oldPath: string = path
        const newPath: string = `${destination}/${originalname}`

        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath)//如果同名文件存在，直接覆盖
            const uploadPath: string = `${ConstantUtil.staticDir()}/HKUST/profile/${originalname}`
            return await this.adminDao.updateAvatarByUsername(username, uploadPath).catch(() => false)
        } else {
            return false
        }
    }

}

export default AdminServiceImpl