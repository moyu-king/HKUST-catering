import * as path from "path";
import * as ip from 'ip'

class ConstantUtil {
    // public static ip: string = '115.29.177.15';
    public static port: number = 4396
    public static privateKey: string = 'EvanZhao'
    public static serverErrMsg: string = '服务器开了小差，请稍后再试~'
    public static uploadAdminProfilePath: string = path.join(__dirname, '../upload/HKUST/profile')
    public static uploadFoodImagePath: string = path.join(__dirname, '../upload/HKUST/food')

    public static staticDir(): string {
        return `http://${ip.address()}:${this.port}/static`
        // return `http://${this.ip}:${this.port}/static`
    }
}

export default ConstantUtil