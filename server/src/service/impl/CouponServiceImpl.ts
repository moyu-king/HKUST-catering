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

    async getIssueCoupons(): Promise<Coupon[]> {
        const date: number = new Date().getTime()
        return await this.couponDao.findByDate(date).catch(() => null)
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
            return false
        })
    }

    async getCoupon(coupon_id: string, student_id: string): Promise<boolean> {
        return await this.couponDao.addCouponToStudent(coupon_id, student_id).catch(() => false)
    }

    async getStudentCoupons(student_id: string): Promise<Coupon[]> {
        try {
            const date: number = new Date().getTime()
            let studentCoupons: any[] = await this.couponDao.findStudentCoupons(student_id)

            //根据date进行筛选
            studentCoupons = studentCoupons.filter(studentCoupon => studentCoupon.expireIn > date)
            return studentCoupons
        } catch (e) {
            return null
        }
    }

    async getAvailableStudentCouponsNumber(student_id: string): Promise<number | boolean> {
        try {
            const date: number = new Date().getTime()
            let studentCoupons: any[] = await this.couponDao.findStudentCoupons(student_id)

            //根据date进行筛选
            studentCoupons = studentCoupons.filter(studentCoupon => studentCoupon.expireIn > date && studentCoupon.status)
            return studentCoupons.length
        } catch (e) {
            return false
        }
    }

    async updateStudentCouponStatus(student_id: string, coupon_id: string): Promise<boolean> {
        return this.couponDao.updateStatusById(student_id, coupon_id)
    }

}

export default CouponServiceImpl