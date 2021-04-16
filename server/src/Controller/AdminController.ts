class AdminController {
    public static async getIndexData(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }
}

export default AdminController;