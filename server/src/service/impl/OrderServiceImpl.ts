import OrderService from "../OrderService";
import Order from "../../model/Order";
import OrderDao from "../../dao/OrderDao";
import OrderDaoImpl from "../../dao/impl/OrderDaoImpl";
import AdminDao from "../../dao/AdminDao";
import AdminDaoImpl from "../../dao/impl/AdminDaoImpl";
import OrderStatusEnum from "../../enum/OrderStatusEnum";
import OrderTypeEnum from "../../enum/OrderTypeEnum";
import FileUtil from "../../utils/FileUtil";
import OrderFood from "../../model/OrderFood";

class OrderServiceImpl implements OrderService {
  orderDao: OrderDao;

  async addOrder(order: Order, foods: any[]): Promise<boolean> {
    try {
      this.orderDao = new OrderDaoImpl();
      const adminDao: AdminDao = new AdminDaoImpl();
      order.admin_phone = (await adminDao.findFirstOnce()).phone;
      order.status = OrderStatusEnum.untreated;
      order.create_time = new Date().getTime();

      switch (order.order_type) {
        case OrderTypeEnum.TangShi:
          order.order_id = FileUtil.orderId("TS");
          break;
        case OrderTypeEnum.DaBao:
          order.order_id = FileUtil.orderId("DB");
          break;
        case OrderTypeEnum.WaiMai:
          order.order_id = FileUtil.orderId("WM");
          break;
      }

      const bothIds: OrderFood[] = [];

      foods?.forEach((item) => {
        const orderFood: OrderFood = new OrderFood();
        orderFood.order_id = order.order_id;
        orderFood.food_id = item.food_id;
        orderFood.number = item.number;
        bothIds.push(orderFood);
      });
      return !!(await Promise.all([
        await this.orderDao.insertOnce(order),
        await this.orderDao.insertOrderFood(bothIds),
      ]));
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getOrderType(): Promise<number[]> {
    this.orderDao = new OrderDaoImpl();
    return await this.orderDao.queryAllOrderType().catch(() => null);
  }

  async getStudentOrders(studentId: string): Promise<Order[]> {
    this.orderDao = new OrderDaoImpl();
    return await this.orderDao.queryOrderByStudentId(studentId).catch((e) => {
      console.log(e);
      return null;
    });
  }

  async getStudentOrderFoods(orderIds: string[]): Promise<any[]> {
    try {
      this.orderDao = new OrderDaoImpl();
      const promiseArray: Promise<any>[] = orderIds.map((orderId) =>
        this.orderDao.findOrderFoodByOrderId(orderId)
      );
      let foods: any[] = await Promise.all(promiseArray);

      //处理格式
      foods = foods.map((item) => ({
        order_id: item[0].order_id,
        food: item,
      }));
      return foods;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getStudentNewOrder(studentId: string): Promise<Order> {
    this.orderDao = new OrderDaoImpl();
    return await this.orderDao
      .findNewOrderByStudentId(studentId)
      .catch((e) => null);
  }

  async getStudentNewOrderFoods(orderId: string): Promise<any[]> {
    this.orderDao = new OrderDaoImpl();
    return await this.orderDao
      .findOrderFoodByOrderId(orderId)
      .catch((e) => null);
  }

  async getOutstandingOrder(): Promise<any[]> {
    this.orderDao = new OrderDaoImpl();
    return await this.orderDao.queryOutstandingOrder().catch((e) => {
      console.log(e);
      return null;
    });
  }

  async getOrdersByPaginationAndDate(
    pageStart: number,
    pageSize: number,
    startTime: number,
    endTime: number
  ): Promise<Order[]> {
    this.orderDao = new OrderDaoImpl();
    pageStart = (pageStart - 1) * pageSize;
    return await this.orderDao
      .queryByPageAndDate(pageStart, pageSize, startTime, endTime)
      .catch((e) => {
        console.log(e);
        return null;
      });
  }

  async getOrdersCount(
    startTime: number,
    endTime: number
  ): Promise<number | boolean> {
    return await this.orderDao
      .queryCountByDate(startTime, endTime)
      .catch((e) => false);
  }
}

export default OrderServiceImpl;
