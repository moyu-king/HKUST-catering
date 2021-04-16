class Student {
    private _stu_id: number;
    private _name: string;
    private _password: string;
    private _phone: number;
    private _address: string;
    private _avatar: string;

    get stu_id(): number {
        return this._stu_id;
    }

    set stu_id(value: number) {
        this._stu_id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get phone(): number {
        return this._phone;
    }

    set phone(value: number) {
        this._phone = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }
}

export default Student