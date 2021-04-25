import Food from "../model/Food";

interface FoodDao {
    addFood(food: Food): Promise<boolean>

    updateFood(food: Food): Promise<boolean>

    queryAll(): Promise<Food[]>

    deleteById(food_id: string): Promise<boolean>

    findById(food_id: string): Promise<Food>
}

export default FoodDao