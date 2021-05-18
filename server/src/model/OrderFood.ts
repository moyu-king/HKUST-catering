class OrderFood {
    private _order_id: string
    private _food_id: string
    private _number: number

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    get order_id(): string {
        return this._order_id;
    }

    set order_id(value: string) {
        this._order_id = value;
    }

    get food_id(): string {
        return this._food_id;
    }

    set food_id(value: string) {
        this._food_id = value;
    }
}

export default OrderFood