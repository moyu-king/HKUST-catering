import Admin from "../model/Admin";

interface AdminDao {
    findByUsername(username: string): Promise<Admin>
}

export default AdminDao;