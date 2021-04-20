import LoginEnum from "../enum/LoginEnum";
import Admin from "../model/Admin";

interface AdminService {
    login(username: string, password: string): Promise<LoginEnum | string>

    getAdminInfo(username: string): Promise<Admin>

    updateAdminInfo(admin: Admin): Promise<boolean>

    updateAdminAvatar(originalname: string, destination: string, path: string, username: string): Promise<boolean>

    getAccountFlow(date: number): Promise<any>

    getUserFlow(date: number): Promise<any>

    validatePass(username: string, password: string): Promise<boolean>

    updatePass(username: string, password: string): Promise<boolean>

    addNewFood(name: string, type: string, price: number): Promise<any>

    getFoodData(): Promise<any>
}

export default AdminService;