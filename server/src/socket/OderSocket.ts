import * as ws from 'nodejs-websocket'
import OrderService from "../service/OrderService";
import OrderServiceImpl from "../service/impl/OrderServiceImpl";
import Order from "../model/Order";
import CouponService from "../service/CouponService";
import CouponServiceImpl from "../service/impl/CouponServiceImpl";
import HttpUtil from "../utils/HttpUtil";
import StudentService from "../service/StudentService";
import StudentServiceImpl from "../service/impl/StudentServiceImpl";
import ConstantUtil from "../utils/ConstantUtil";
import OrderTypeEnum from "../enum/OrderTypeEnum";

const PORT: number = 9527
const ADMIN: string = 'EvanZhao'

export function oderSocket() {
    const server = ws.createServer(conn => {
        //text
        conn.on('text', async data => {
            const body = JSON.parse(data)
            conn.username = body.username

            if (conn.username !== ADMIN) {

                const orderService: OrderService = new OrderServiceImpl()
                const order: Order = new Order()

                if (!body.order_type) return

                order.order_type = body.order_type
                order.price = body.price
                order.discount = body.discount
                order.student_id = conn.username

                let res: boolean = await orderService.addOrder(order, body.foods)

                //优惠券处理
                if (body.coupon_id) {
                    const couponService: CouponService = new CouponServiceImpl()
                    res = await couponService.updateStudentCouponStatus(conn.username, body.coupon_id)
                }

                //服务器返回数据给用户
                if (res) {
                    conn.send(JSON.stringify(HttpUtil.resBody(1, '预订成功', '')))
                } else {
                    conn.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
                }

                //如果是外卖订单服务器反馈信息
                if (body.order_type === OrderTypeEnum.WaiMai) {
                    for (let item of server.connections) {
                        if (item.username === ADMIN) {
                            //查询用户信息、订单信息、选购信息
                            const studentService: StudentService = new StudentServiceImpl()
                            const orderService: OrderService = new OrderServiceImpl()

                            let flag: boolean//记录服务器状态

                            const [userInfo, userOrder] = await Promise.all([
                                studentService.getStudentInfo(order.student_id),
                                orderService.getStudentNewOrder(order.student_id)
                            ])

                            let foods: any[]
                            if (userInfo && userOrder) {
                                foods = await orderService.getStudentNewOrderFoods(userOrder.order_id)
                                flag = !!foods
                            } else {
                                flag = false
                            }

                            if (flag) {
                                item.send(JSON.stringify(HttpUtil.resBody(1, '新的订单', {userInfo, userOrder, foods})))
                            } else {
                                item.send(JSON.stringify(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, '')))
                            }
                        }
                    }
                }
            }
        })
        //close 不作处理
        conn.on('close', () => {
        })
        //error 捕捉不作处理
        conn.on('error', () => {
        })
    })

    server.listen(PORT, () => {
        console.log('websocket server is running in 9527')
    })
}
