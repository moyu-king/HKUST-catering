class Food {
    private _food_id: string
    private _food_name: string
    private _price: number
    private _image: string
    private _type: string
    private _description:string

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get food_id(): string {
        return this._food_id;
    }

    set food_id(value: string) {
        this._food_id = value;
    }

    get food_name(): string {
        return this._food_name;
    }

    set food_name(value: string) {
        this._food_name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }
}

export default Food