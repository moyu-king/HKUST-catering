class Coupon {
  private _coupon_id: string
  private _title: string
  private _discount: number
  private _limit: number
  private _create_time: number
  private _expireIn: number

  get coupon_id(): string {
    return this._coupon_id
  }

  set coupon_id(value: string) {
    this._coupon_id = value
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get discount(): number {
    return this._discount
  }

  set discount(value: number) {
    this._discount = value
  }

  get limit(): number {
    return this._limit
  }

  set limit(value: number) {
    this._limit = value
  }

  get create_time(): number {
    return this._create_time
  }

  set create_time(value: number) {
    this._create_time = value
  }

  get expireIn(): number {
    return this._expireIn
  }

  set expireIn(value: number) {
    this._expireIn = value
  }
}

export default Coupon
