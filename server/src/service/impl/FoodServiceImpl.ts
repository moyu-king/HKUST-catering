import * as uuid from "uuid"
import FoodService from "../FoodService";
import Food from "../../model/Food";
import FoodDao from "../../dao/FoodDao";
import FoodDaoImpl from "../../dao/impl/FoodDaoImpl";

class FoodServiceImpl implements FoodService {
    private foodDao: FoodDao

    constructor() {
        this.foodDao = new FoodDaoImpl()
    }

    async addFood(food_name: string, price: number, type: string): Promise<boolean> {
        const food: Food = new Food()
        food.food_id = uuid.v1()
        food.type = type
        food.food_name = food_name
        food.price = price

        return await this.foodDao.addFood(food).catch(() => false)
    }

    async updateFood(food_name: string, price: number, type: string, food_id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    async addFoodToMenu(food_id: string, number: number, date: number): Promise<boolean> {
        return await this.foodDao.addFoodToMenu(food_id, number, date).catch(() => false)
    }

}

export default FoodServiceImpl