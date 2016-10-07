"use strict";


class User {
  constructor({type} = {}) {
    this._type = type;
    this._score = 0;
  }

  _render(activeUser, num) {
    document.querySelector(".users__user-" + activeUser).innerHTML = num;
  }
}

class Game {
  constructor({user1, user2, field} = {}) {
    this._users = {
      1: user1,
      2: user2
    };
    this._field = field;
    this._activeUser = 1;
    this.gameCounter = 0;

    this._field._elem.addEventListener("click", this._getCell.bind(this));

  }

  _getCell(e) {
   let target = e.target;

    if (target.closest(".field__cels")) {
      let cell = target.getAttribute("data-cell-num");

      if (target._marked) return;
      this._field._setMark(cell, this._users[this._activeUser]._type);
      this._checkGameState();
      // console.log(this._activeUser);
      // console.log(target);
      this._changeUser();
      return;
    }
  }

  _checkGameState() {
    if (this._field._isWinner(this._field._field)) {
      this._users[this._activeUser]._score += 1;
      this._users[this._activeUser]._render(this._activeUser, this._users[this._activeUser]._score);
      // TODO спросить - продолжить или выход? если продолжить рефрешгейм, если нет выход в лобби
      this._refreshGame();
    }
  }

  _refreshGame() {
    let field = this._field._field;
    let cells = this._field._cells;
    for (let i = 0; i < field.length; i++) {
      field[i] = "";
      cells[i]._marked = false;
    }
    this._field._renderState(field, cells)
  }

  _changeUser() {
    if (this._activeUser === 1) {
      this._activeUser = 2;
    } else {
      this._activeUser = 1;
    }
  }
}

class Field {
  constructor(elem) {
    this._elem = elem;
    this._cells = elem.querySelectorAll(".field__cels");
    this._field = [
      "","","",
      "","","",
      "","",""
    ];
  }

  _setMark(cell, userType) {
    this._field[cell] = userType;
    this._renderState(this._field, this._cells);
  }

  _renderState(field, cells) {
    field.forEach((elem, i) => {
      if (elem !== "") {
        cells[i]._marked = true;
      }

      cells[i].innerHTML = elem
    });
  }

  _isWinner(field) {
    if (field[0] !== "" && field[0] === field[1] && field[1] === field[2]) {
      return true;
    }

    if (field[3] !== "" && field[3] === field[4] && field[4] === field[5]) {
      return true;
    }

    if (field[6] !== "" && field[6] === field[7] && field[7] === field[8]) {
      return true;
    }

    if (field[0] !== "" && field[0] === field[3] && field[3] === field[6]) {
      return true;
    }

    if (field[1] !== "" && field[1] === field[4] && field[4] === field[7]) {
      return true;
    }

    if (field[2] !== "" && field[2] === field[5] && field[5] === field[8]) {
      return true;
    }

    if (field[0] !== "" && field[0] === field[4] && field[4] === field[8]) {
      return true;
    }

    if (field[2] !== "" && field[2] === field[4] && field[4] === field[6]) {
      return true;
    }
  }
}


let game = new Game({
  field: new Field(document.querySelector(".field")),
  user1: new User({type: "x"}),
  user2: new User({type: "o"})
});

let field = new Field(document.querySelector(".field"));


