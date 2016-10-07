'use strict'

class User {
  constructor(name) {
    this._name = name;
  }

  sayHi(who) {
    return `Hello ${who._name}`;
  }
}

Module.exports = User;