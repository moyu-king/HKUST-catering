import Food from "../model/Food";

interface FoodService {
    addFood(food_name: string, price: number, type: string, description: string, destination: string, path: string, filename: string): Promise<boolean>

    updateFood(food_name: string, price: number, type: string, food_id: string): Promise<boolean>

    getFoodData(): Promise<Food[] | boolean>

    deleteFood(food_id: string): Promise<boolean>
}

export default FoodService