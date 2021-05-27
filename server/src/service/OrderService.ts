import Order from "../model/Order";

interface OrderService {
    addOrder(order: Order, foods: any[]): Promise<boolean>

    getOrderType(): Promise<number[]>

    getStudentOrders(studentId: string): Promise<Order[]>

    getStudentOrderFoods(orderIds: string[]): Promise<any[]>

    getStudentNewOrder(studentId: string): Promise<Order>

    getStudentNewOrderFoods(orderId: string): Promise<any[]>

    getOutstandingOrder(): Promise<any[]>

    getOrdersByPaginationAndDate(pageStart: number, pageSize: number, startTime: number, endTime: number): Promise<Order[]>

    getOrdersCount(startTime: number, endTime: number): Promise<number | boolean>

}

export default OrderService