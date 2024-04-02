class Order {
  get discount(): number {
    return this._discount
  }

  set discount(value: number) {
    this._discount = value
  }
  private _order_id: string
  private _student_id: string
  private _admin_phone: string
  private _status: number
  private _create_time: number
  private _order_type: number
  private _price: number
  private _discount: number

  get price(): number {
    return this._price
  }

  set price(value: number) {
    this._price = value
  }

  get order_type(): number {
    return this._order_type
  }

  set order_type(value: number) {
    this._order_type = value
  }

  get status(): number {
    return this._status
  }

  set status(value: number) {
    this._status = value
  }

  get order_id(): string {
    return this._order_id
  }

  set order_id(value: string) {
    this._order_id = value
  }

  get admin_phone(): string {
    return this._admin_phone
  }

  set admin_phone(value: string) {
    this._admin_phone = value
  }

  get student_id(): string {
    return this._student_id
  }

  set student_id(value: string) {
    this._student_id = value
  }

  get create_time(): number {
    return this._create_time
  }

  set create_time(value: number) {
    this._create_time = value
  }
}

export default Order
