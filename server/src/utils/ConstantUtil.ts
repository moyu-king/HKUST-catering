import * as path from "path";
import OSUtil from "./OSUtil";

class ConstantUtil {
    public static port: number = 4396
    public static privateKey: string = 'EvanZhao'
    public static serverErrMsg: string = '服务器开了小差，请稍后再试~'
    public static uploadAdminProfilePath: string = path.join(__dirname, '../upload/HKUST/profile')
    public static uploadFoodImagePath: string = path.join(__dirname, '../upload/HKUST/food')

    public static staticDir(): string {
        return `http://${OSUtil.getLocalIP()}:${this.port}/static`
    }
}

export default ConstantUtil