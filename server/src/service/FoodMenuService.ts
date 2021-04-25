interface FoodMenuService {
    addFoodMenu(foods_id: string[], number: number, date: number): Promise<boolean | any[]>

    addHasDuplicateFoodMenu(foods_id: string[], number: number, date: number, operate: number): Promise<boolean | any[]>

    deleteFoodMenu(food_menu_id: string): Promise<boolean>

    updateFoodMenuNum(number: number, food_menu_id: string): Promise<boolean>

    getFoodMenu(): Promise<any[] | boolean>
}

export default FoodMenuService