import * as path from 'path'
import * as ip from 'ip'

class ConstantUtil {
  public static port = 4396
  public static privateKey = 'EvanZhao'
  public static serverErrMsg = '服务器开了小差，请稍后再试~'
  public static uploadAdminProfilePath = path.join(__dirname, '../upload/HKUST/profile')
  public static uploadFoodImagePath = path.join( __dirname, '../upload/HKUST/food')

  public static staticDir() {
    return `http://${ip.address()}:${this.port}/static`
  }
}

export default ConstantUtil
