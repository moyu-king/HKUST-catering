import Coupon from "../model/Coupon";

interface CouponDao {
    addCoupon(coupon: Coupon): Promise<boolean>

    addCouponToStudent(coupon_id: string, student_id: string): Promise<boolean>

    findByDate(date: number): Promise<Coupon[]>

    findStudentCoupons(student_id: string): Promise<any[]>

    findAvailableCountByStudentsId(student_id): Promise<number>

    updateStatusById(student_id: string, coupon_id: string): Promise<boolean>
}

export default CouponDao;