class Order {
    private _order_id: string
    private _price: string
    private _create_time: string
    private _order_type: string
    private _admin_phone: string
    private _student_id: string
    private _status: string

    get order_id(): string {
        return this._order_id;
    }

    set order_id(value: string) {
        this._order_id = value;
    }

    get price(): string {
        return this._price;
    }

    set price(value: string) {
        this._price = value;
    }

    get create_time(): string {
        return this._create_time;
    }

    set create_time(value: string) {
        this._create_time = value;
    }

    get order_type(): string {
        return this._order_type;
    }

    set order_type(value: string) {
        this._order_type = value;
    }

    get admin_phone(): string {
        return this._admin_phone;
    }

    set admin_phone(value: string) {
        this._admin_phone = value;
    }

    get student_id(): string {
        return this._student_id;
    }

    set student_id(value: string) {
        this._student_id = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }
}

export default Order