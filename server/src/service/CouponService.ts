import Coupon from "../model/Coupon";

interface CouponService {
    issueCoupon(title: string, discount: number, limit: number, create_time: number, expireIn: number): Promise<boolean>

    getIssueCoupons(): Promise<Coupon[]>

    getCoupon(coupon_id: string, student_id: string): Promise<boolean>

    getStudentCoupons(student_id: string): Promise<Coupon[]>

    getAvailableStudentCouponsNumber(student_id: string): Promise<number | boolean>

    updateStudentCouponStatus(student_id: string, coupon_id: string): Promise<boolean>
}

export default CouponService