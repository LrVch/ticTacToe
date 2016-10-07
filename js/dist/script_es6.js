"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var type = _ref.type;

    _classCallCheck(this, User);

    this._type = type;
    this._score = 0;
  }

  _createClass(User, [{
    key: "_render",
    value: function _render(activeUser, num) {
      document.querySelector(".users__user-" + activeUser).innerHTML = num;
    }
  }]);

  return User;
}();

var Game = function () {
  function Game() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var user1 = _ref2.user1;
    var user2 = _ref2.user2;
    var field = _ref2.field;

    _classCallCheck(this, Game);

    this._users = {
      1: user1,
      2: user2
    };
    this._field = field;
    this._activeUser = 1;
    this.gameCounter = 0;

    this._field._elem.addEventListener("click", this._getCell.bind(this));
  }

  _createClass(Game, [{
    key: "_getCell",
    value: function _getCell(e) {
      var target = e.target;

      if (target.closest(".field__cels")) {
        var cell = target.getAttribute("data-cell-num");

        if (target._marked) return;
        this._field._setMark(cell, this._users[this._activeUser]._type);
        this._checkGameState();
        // console.log(this._activeUser);
        // console.log(target);
        this._changeUser();
        return;
      }
    }
  }, {
    key: "_checkGameState",
    value: function _checkGameState() {
      if (this._field._isWinner(this._field._field)) {
        this._users[this._activeUser]._score += 1;
        this._users[this._activeUser]._render(this._activeUser, this._users[this._activeUser]._score);
        // TODO спросить - продолжить или выход? если продолжить рефрешгейм, если нет выход в лобби
        this._refreshGame();
      }
    }
  }, {
    key: "_refreshGame",
    value: function _refreshGame() {
      var field = this._field._field;
      var cells = this._field._cells;
      for (var i = 0; i < field.length; i++) {
        field[i] = "";
        cells[i]._marked = false;
      }
      this._field._renderState(field, cells);
    }
  }, {
    key: "_changeUser",
    value: function _changeUser() {
      if (this._activeUser === 1) {
        this._activeUser = 2;
      } else {
        this._activeUser = 1;
      }
    }
  }]);

  return Game;
}();

var Field = function () {
  function Field(elem) {
    _classCallCheck(this, Field);

    this._elem = elem;
    this._cells = elem.querySelectorAll(".field__cels");
    this._field = ["", "", "", "", "", "", "", "", ""];
  }

  _createClass(Field, [{
    key: "_setMark",
    value: function _setMark(cell, userType) {
      this._field[cell] = userType;
      this._renderState(this._field, this._cells);
    }
  }, {
    key: "_renderState",
    value: function _renderState(field, cells) {
      field.forEach(function (elem, i) {
        if (elem !== "") {
          cells[i]._marked = true;
        }

        cells[i].innerHTML = elem;
      });
    }
  }, {
    key: "_isWinner",
    value: function _isWinner(field) {
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
  }]);

  return Field;
}();

var game = new Game({
  field: new Field(document.querySelector(".field")),
  user1: new User({ type: "x" }),
  user2: new User({ type: "o" })
});

var field = new Field(document.querySelector(".field"));