import Admin from "../model/Admin";

interface AdminDao {
    findByUsername(username: string): Promise<Admin>

    updateInfo(admin: Admin): Promise<boolean>
}

export default AdminDao;