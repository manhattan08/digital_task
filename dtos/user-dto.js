module.exports = class UserDto {
    email;
    name;
    login;
    phone;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.login = model.login;
        this.phone = model.phone;
    }
}