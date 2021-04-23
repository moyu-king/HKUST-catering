import * as uuid from "uuid"
import FoodService from "../FoodService";
import Food from "../../model/Food";
import FoodDao from "../../dao/FoodDao";
import FoodDaoImpl from "../../dao/impl/FoodDaoImpl";
import * as fs from "fs";
import ConstantUtil from "../../utils/ConstantUtil";

class FoodServiceImpl implements FoodService {
    private foodDao: FoodDao

    constructor() {
        this.foodDao = new FoodDaoImpl()
    }

    async addFood(food_name: string, price: number, type: string, description: string, destination: string, path: string, filename: string): Promise<boolean> {
        //存录信息
        const food: Food = new Food()
        food.food_id = uuid.v1()
        food.type = type
        food.food_name = food_name
        food.price = price
        food.description = description
        //图片处理
        const oldPath: string = path
        const newPath: string = `${destination}/${filename}.jpg`
        food.image = `${ConstantUtil.staticDir()}/HKUST/food/${filename}.jpg`
        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath)
        } else {
            return false
        }

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