import Coupon from "../model/Coupon";

interface CouponDao {
    addCoupon(coupon: Coupon): Promise<boolean>

    addCouponToStudent(coupon_id: string, student_id: string): Promise<boolean>
}

export default CouponDao;