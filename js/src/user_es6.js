"use strict";

class User {
  constructor({type} = {}) {
    this._type = type;
    this._score = 0;
  }

  _render(activeUser, num) {
    document.querySelector(".users__user-" + activeUser).innerHTML = num;
  }

  _clear() {
    this._score = 0;
  }
}