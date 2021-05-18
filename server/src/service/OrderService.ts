import Order from "../model/Order";

interface OrderService {
    addOrder(order: Order, foods: any[]): Promise<boolean>

    getOrderType(): Promise<number[]>

    getStudentOrders(studentId: string): Promise<Order[]>

    getStudentOrderFoods(orderIds: string[]): Promise<any[]>

    getStudentNewOrder(studentId: string): Promise<Order>

    getStudentNewOrderFoods(orderId: string): Promise<any[]>

    getOutstandingOrder(): Promise<any[]>

}

export default OrderService