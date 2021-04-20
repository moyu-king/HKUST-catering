import Admin from "../model/Admin";

interface AdminDao {
    findByUsername(username: string): Promise<Admin>

    updateInfoByUsername(admin: Admin): Promise<boolean>

    updatePassByUsername(username: string, password: string): Promise<boolean>

    updateAvatarByUsername(username:string,uploadPath:string):Promise<boolean>
}

export default AdminDao;