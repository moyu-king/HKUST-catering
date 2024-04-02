import { sign, verify } from 'jsonwebtoken'
import ConstantUtil from './ConstantUtil'

class JWTUtil {
  public static generate(value: any, expires: string | number = '1 days') {
    try {
      return sign(value, ConstantUtil.privateKey, { expiresIn: expires })
    } catch (e) {
      return ''
    }
  }

  public static verify(token: string): any {
    try {
      return verify(token, ConstantUtil.privateKey)
    } catch (e) {
      return false //token过期返回false
    }
  }
}

export default JWTUtil
