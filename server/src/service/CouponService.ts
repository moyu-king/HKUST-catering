interface CouponService {
    issueCoupon(title: string, discount: number, limit: number, create_time: number, expireIn: number): Promise<boolean>

    getCoupon(student_id: string, coupon_id: string): Promise<boolean>
}

export default CouponService