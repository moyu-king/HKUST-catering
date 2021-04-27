import * as uuid from "uuid";
import CouponService from "../CouponService";
import Coupon from "../../model/Coupon";
import CouponDao from "../../dao/CouponDao";
import CouponDaoImpl from "../../dao/impl/CouponDaoImpl";

class CouponServiceImpl implements CouponService {
    private couponDao: CouponDao

    constructor() {
        this.couponDao = new CouponDaoImpl()
    }

    async getCoupon(student_id: string, coupon_id: string): Promise<boolean> {
        return await this.couponDao.addCouponToStudent(student_id, coupon_id).catch(() => false)
    }

    async issueCoupon(title: string, discount: number, limit: number, create_time: number, expireIn: number): Promise<boolean> {
        const coupon: Coupon = new Coupon();
        coupon.title = title
        coupon.discount = discount
        coupon.limit = limit
        coupon.expireIn = expireIn
        coupon.create_time = create_time
        coupon.coupon_id = uuid.v1()

        return await this.couponDao.addCoupon(coupon).catch((e) => {
            console.log(e);
            return false
        })
    }

}

export default CouponServiceImpl