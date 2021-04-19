import Food from "../model/Food";

interface FoodDao {
    addFood(food: Food): Promise<boolean>

    addFoodToMenu(food_id: string, number: number, date: number): Promise<boolean>

    updateFood(food: Food): Promise<boolean>

    updateFoodMenuNum(number: number): Promise<boolean>
}

export default FoodDao