import FoodMenuService from "../FoodMenuService";
import FoodMenuDao from "../../dao/FoodMenuDao";
import FoodMenuDaoImpl from "../../dao/impl/FoodMenuDaoImpl";
import FoodMenu from "../../model/FoodMenu";
import FoodDaoImpl from "../../dao/impl/FoodDaoImpl";
import FoodDao from "../../dao/FoodDao";
import FormatUtil from "../../utils/FormatUtil";
import * as uuid from 'uuid'
import OperateEnum from "../../enum/OperateEnum";

class FoodMenuServiceImpl implements FoodMenuService {
    private foodMenuDao: FoodMenuDao = new FoodMenuDaoImpl()

    constructor() {
        this.foodMenuDao = new FoodMenuDaoImpl()
    }

    async deleteFoodMenu(food_menu_id: string): Promise<boolean> {
        return await this.foodMenuDao.deleteFoodMenuById(food_menu_id).catch(() => false)
    }

    async updateFoodMenuNum(number: number, food_menu_id: string): Promise<boolean> {
        return await this.foodMenuDao.updateFoodMenuNumByFoodMenuId(number, food_menu_id).catch(() => false)
    }

    async addFoodMenu(foods_id: string[], number: number, date: number): Promise<boolean | any[]> {
        const ids: any[] = foods_id.map(food_id => {
            const food_menu_id: string = uuid.v1()
            return this.foodMenuDao.addFoodMenu(food_menu_id, food_id, number, date)
        })
        return await Promise.all(ids).catch(() => false)
    }

    async getFoodMenu(): Promise<any[] | boolean> {
        //截止时间 = 当前时间 - 1天时间
        const date: number = new Date().getTime() - 24 * 60 * 60 * 1000;
        let ids: any[] = []
        let foodMenu: FoodMenu[]
        try {
            foodMenu = await this.foodMenuDao.queryByDate(date)
            foodMenu.forEach(food => {
                ids.push(food.food_id)
            })
            //去重,减少查询数据库次数
            ids = [...new Set(ids)]

            const foodDao: FoodDao = new FoodDaoImpl()

            const promiseArr: any[] = ids.map(id => foodDao.findById(id))
            const foods: any[] = await Promise.all(promiseArr)
            return foodMenu.map(
                item => {
                    item.date = FormatUtil.dateFormat(item.date)
                    return Object.assign(item,
                        foods.find(
                            food =>
                                food.food_id === item.food_id
                        )
                    )
                }
            )

        } catch (e) {
            return false
        }
    }

    async addHasDuplicateFoodMenu(foods_id: string[], number: number, date: number, operate: number): Promise<boolean | any[]> {
        //重复项在foods_id中的index
        let duplicateIndex: number[] = []
        let notDuplicate: string[] = []
        let duplicate: any[] = []
        let promiseArr: any[]

        try {
            promiseArr = foods_id.map(id => this.foodMenuDao.findByFoodIdAndDate(id, date))
            const duplicateFoodMenu: FoodMenu[] = await Promise.all(promiseArr)
            duplicateFoodMenu.forEach(foodMenu => {
                const index: number = foods_id.findIndex(id => foodMenu?.food_id === id)
                if (index !== -1) {
                    duplicateIndex.push(index)
                }
            })
            //1.处理不是重复的内容
            notDuplicate = foods_id.filter((id, index) => !duplicateIndex.includes(index))
            if (notDuplicate.length) {
                promiseArr = notDuplicate.map(food_id => {
                    const food_menu_id: string = uuid.v1()
                    this.foodMenuDao.addFoodMenu(food_menu_id, food_id, number, date)
                })
                await Promise.all(promiseArr)
            }
            //2.处理重复内容
            duplicateIndex.forEach(index => {
                if (operate === OperateEnum.add) {
                    //2-1:累加
                    duplicate.push({
                        food_id: foods_id[index],
                        number: duplicateFoodMenu[index].number + number
                    })
                } else {
                    //2-2:覆盖
                    duplicate.push({
                        food_id: foods_id[index],
                        number
                    })
                }
            })

            promiseArr = duplicate.map(item => this.foodMenuDao.updateFoodMenuNumByFoodId(item.number, item.food_id))
            await Promise.all(promiseArr)

            return true
        } catch (e) {
            return false
        }
    }
}

export default FoodMenuServiceImpl