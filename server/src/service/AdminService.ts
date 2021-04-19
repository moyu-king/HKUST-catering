import LoginEnum from "../enum/LoginEnum";
import Admin from "../model/Admin";

interface AdminService {
    login(username: string, password: string): Promise<LoginEnum | string>

    getAdminInfo(username: string): Promise<Admin>

    updateAdminInfo(alias: string, phone: string, address: string, shop_name: string, username: string): Promise<boolean>

    getAccountFlow(date: number): Promise<any>

    getUserFlow(date: number): Promise<any>

    validatePass(username: string, password: number): Promise<any>

    updatePass(username: string, password: number): Promise<any>

    addNewFood(name: string, type: string, price: number): Promise<any>

    getFoodData(): Promise<any>
}

export default AdminService;