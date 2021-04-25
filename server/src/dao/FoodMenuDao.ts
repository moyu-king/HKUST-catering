import FoodMenu from "../model/FoodMenu";

interface FoodMenuDao {
    deleteFoodMenuById(food_menu_id: string): Promise<boolean>

    updateFoodMenuNumByFoodMenuId(number: number, food_menu_id): Promise<boolean>

    updateFoodMenuNumByFoodId(number: number, food_id): Promise<boolean>

    addFoodMenu(food_menu_id: string, food_id: string, number: number, date: number): Promise<boolean>

    queryByDate(date): Promise<FoodMenu[]>

    findByFoodIdAndDate(food_id: string, date: number): Promise<FoodMenu>
}

export default FoodMenuDao