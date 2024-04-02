class Student {
  private _student_id: string
  private _name: string
  private _password: string
  private _address: string
  private _avatar: string
  private _wallet: string
  private _phone: string
  private _payment_password: string

  get payment_password(): string {
    return this._payment_password
  }

  set payment_password(value: string) {
    this._payment_password = value
  }

  get phone(): string {
    return this._phone
  }

  set phone(value: string) {
    this._phone = value
  }

  get student_id(): string {
    return this._student_id
  }

  set student_id(value: string) {
    this._student_id = value
  }

  get wallet(): string {
    return this._wallet
  }

  set wallet(value: string) {
    this._wallet = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get password(): string {
    return this._password
  }

  set password(value: string) {
    this._password = value
  }

  get address(): string {
    return this._address
  }

  set address(value: string) {
    this._address = value
  }

  get avatar(): string {
    return this._avatar
  }

  set avatar(value: string) {
    this._avatar = value
  }
}

export default Student
