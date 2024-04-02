class Admin {
  private _username: string
  private _password: string
  private _phone: string
  private _avatar: string
  private _alias: string
  private _address: string
  private _shop_name: string

  get phone(): string {
    return this._phone
  }

  set phone(value: string) {
    this._phone = value
  }

  get alias(): string {
    return this._alias
  }

  set alias(value: string) {
    this._alias = value
  }

  get address(): string {
    return this._address
  }

  set address(value: string) {
    this._address = value
  }

  get shop_name(): string {
    return this._shop_name
  }

  set shop_name(value: string) {
    this._shop_name = value
  }

  get username(): string {
    return this._username
  }

  set username(value: string) {
    this._username = value
  }

  get password(): string {
    return this._password
  }

  set password(value: string) {
    this._password = value
  }

  get avatar(): string {
    return this._avatar
  }

  set avatar(value: string) {
    this._avatar = value
  }
}

export default Admin
