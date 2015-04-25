'use strict';

function User(obj) {
    this._id = obj.id;
    this.name = obj.name;
    this.sex = obj.sex;
    this.department = obj.department;
    this.imageUrl = obj.imageUrl;
}

module.exports = User;