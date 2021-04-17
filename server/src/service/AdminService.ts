import LoginEnum from "../enum/LoginEnum";

interface AdminService {
    login(username: string, password: string): Promise<LoginEnum | string>

    getAdminInfo(username: string): Promise<any>

    getAccountFlow(date: number): Promise<any>

    getUserFlow(date: number): Promise<any>

    validatePass(username: string, password: number): Promise<any>

    modifyPass(username: string, password: number): Promise<any>

    addNewFood(name: string, type: string, price: number): Promise<any>

    getFoodData(): Promise<any>

    issueCoupon(title: string, discount: number, limit: number, expireIn: number): Promise<any>
}

export default AdminService;