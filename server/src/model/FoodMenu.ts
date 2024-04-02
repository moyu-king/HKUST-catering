class FoodMenu {
  private _food_id: string
  private _number: number
  private _date: number | string

  get food_id(): string {
    return this._food_id
  }

  set food_id(value: string) {
    this._food_id = value
  }

  get number(): number {
    return this._number
  }

  set number(value: number) {
    this._number = value
  }

  get date(): number | string {
    return this._date
  }

  set date(value: number | string) {
    this._date = value
  }
}

export default FoodMenu
