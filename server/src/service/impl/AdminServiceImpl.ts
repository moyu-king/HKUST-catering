import AdminService from '../AdminService';
import AdminDao from '../../dao/AdminDao';
import AdminDaoImpl from '../../dao/impl/AdminDaoImpl';
import LoginEnum from "../../enum/LoginEnum";
import JWTUtil from "../../utils/JWTUtil";

class AdminServiceImpl implements AdminService {
    private adminDao: AdminDao;

    constructor() {
        this.adminDao = new AdminDaoImpl()
    }

    async addNewFood(name: string, type: string, price: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getAccountFlow(date: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getAdminInfo(username: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getFoodData(): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getUserFlow(date: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async issueCoupon(title: string, discount: number, limit: number, expireIn: number): Promise<any> {
        return Promise.resolve(undefined);
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

    async modifyPass(username: string, password: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async validatePass(username: string, password: number): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export default AdminServiceImpl