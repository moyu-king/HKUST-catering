import Order from "../model/Order";
import OrderFood from "../model/OrderFood";

interface OrderDao {
    //order表
    insertOnce(oder: Order): Promise<boolean>

    queryAllOrderType(): Promise<number[]>

    queryOrderByStudentId(studentId: string): Promise<Order[]>

    findNewOrderByStudentId(studentId: string): Promise<Order>

    queryOutstandingOrder(): Promise<Order[]>

    //order_food表
    insertOrderFood(foods: OrderFood[]): Promise<boolean>

    findOrderFoodByOrderId(orderId: string): Promise<any[]>
}

export default OrderDao