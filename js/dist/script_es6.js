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
  }, {
    key: "_clear",
    value: function _clear() {
      this._score = 0;
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
    var _ref2$againstsWho = _ref2.againstsWho;
    var againstsWho = _ref2$againstsWho === undefined ? "computer" : _ref2$againstsWho;

    _classCallCheck(this, Game);

    this._users = {
      1: user1,
      2: user2
    };
    this._field = field;
    this._activeUser = 1;
    this._gameCounter = 0;
    this._againstsWho = againstsWho;
    this._logs = [];
    this._stepsForLog = [];

    console.log("game is created");

    this._field._elem.addEventListener("click", this._manager.bind(this));
  }

  _createClass(Game, [{
    key: "_writeLog",
    value: function _writeLog(isWinner, field, steps) {
      var winer = void 0;

      if (isWinner) {
        winer = this._users[this._activeUser];
      } else {
        winer = "there is no winners";
      }

      this._logs.push({
        winer: winer,
        field: field.slice(),
        steps: steps.slice(),
        formatField: function formatField(field) {
          var result = '';

          field.forEach(function (cell, i) {
            if (cell === "") cell = ".";

            if ((i + 1) % 3 === 0 && i !== 8) {
              result += cell + "\n ";
            } else {
              result += cell + " ";
            }
          });

          return result.slice(0, -1);
        },
        getFormatedField: function getFormatedField() {
          return this.formatField(this.field);
        },
        getFormatedSteps: function getFormatedSteps() {
          var _this = this;

          var result = "";

          this.steps.forEach(function (step, i) {
            if (i > 0) {
              result += " ";
            }

            result += _this.formatField(step) + "\n" + "(" + (i + 1) + ")" + "=".repeat(20) + "\n";
          });

          return result;
        }
      });
    }
  }, {
    key: "_brain",
    value: function _brain() {
      var _this2 = this;

      var field = this._field._field;
      var cells = this._field._cells;
      var cellNeedMark = "";

      if (field[4] === "") {
        console.log("hard");
        cellNeedMark = 4;
      } else {
        while (true) {
          var cellNum = Math.round(Math.random() * 9);

          if (field[cellNum] === "") {
            console.log("easy");
            cellNeedMark = cellNum;
            break;
          }
        }
      }
      setTimeout(function () {
        _this2._field._setMark(cellNeedMark, _this2._users[_this2._activeUser]._type);
        _this2._checkGameState();
        _this2._changeUser();
        _this2._isComputerMove = false;
        console.log("end AI move");

        if (_this2._isGaveOver) {
          _this2._isGaveOver = false;
          return;
        }
      }, 1000);
    }
  }, {
    key: "_setUsersType",
    value: function _setUsersType(value) {
      var users = this._users;

      if (value === "x") {
        users[1]._type = "x";
        users[2]._type = "o";
      }

      if (value === "o") {
        users[1]._type = "o";
        users[2]._type = "x";
      }
    }
  }, {
    key: "_setAgainstWho",
    value: function _setAgainstWho(value) {
      if (value !== "user" && value !== "computer") return;

      this._againstsWho = value;
    }
  }, {
    key: "_manager",
    value: function _manager(e) {
      var target = e.target;

      if (target.closest(".field__cels")) {
        if (this._isComputerMove) return;

        var cell = target.getAttribute("data-cell-num");

        if (target._marked) return;

        this._field._setMark(cell, this._users[this._activeUser]._type);
        this._checkGameState();

        if (this._isGaveOver) {
          this._isGaveOver = false;
          return;
        }

        this._changeUser();

        if (this._againstsWho === "computer") {
          this._isComputerMove = true;
          this._brain();
        }
        return;
      }
    }
  }, {
    key: "_checkGameState",
    value: function _checkGameState() {
      this._stepsForLog.push(this._field._field.slice());

      if (this._field._isWinner(this._field._field)) {
        this._users[this._activeUser]._score += 1;
        this._users[this._activeUser]._render(this._activeUser, this._users[this._activeUser]._score);
        this._writeLog(true, this._field._field, this._stepsForLog);
        this._isGaveOver = true;
        // TODO спросить - продолжить или выход? если продолжить рефрешгейм, если нет выход в лобби
        this._refreshGame();
        this._gameCounter++;
      }

      if (!this._field._isWinner(this._field._field) && this._field._isOverGame(this._field._field)) {
        alert("there is no winners");
        this._writeLog(false, this._field._field, this._stepsForLog);
        this._isGaveOver = true;
        this._refreshGame();
        this._gameCounter++;
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
      this._activeUser = 1;
      this._stepsForLog = [];
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
    key: "_clear",
    value: function _clear() {
      for (var i = 0; i < this._field.length; i++) {
        this._field[i] = "";
      }
      this._cells.forEach(function (cell) {
        cell.innerHTML = "";
        cell._marked = false;
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
  }, {
    key: "_isOverGame",
    value: function _isOverGame(field) {
      return field.every(function (cell) {
        return cell !== "";
      });
    }
  }]);

  return Field;
}();

var Lobby = function () {
  function Lobby() {
    _classCallCheck(this, Lobby);

    this._gamePopup = document.querySelector(".game-popup");
    this._field = document.querySelector(".field");
    this._settings = {
      elem: document.querySelector(".settings"),
      chips: document.querySelector(".chips"),
      againstsWho: "computer", // user
      userWeapoon: "x" // O
    };
    this._isGame = false;

    this._settings.elem.addEventListener("click", this._getSettingsItem.bind(this));
    this._gamePopup.addEventListener("click", this._getPopupItem.bind(this));

    this._init();
  }

  _createClass(Lobby, [{
    key: "_showToast",
    value: function _showToast(mess, checkClass, chips) {
      var chip = chips.querySelector("." + checkClass);

      chip.innerHTML = mess;
    }
  }, {
    key: "_getSettingsItem",
    value: function _getSettingsItem(e) {
      var target = e.target;

      if (target.closest(".against-computer")) {
        this._settings.againstsWho = "computer";
        this._showToast("against ai", "chip__who", this._settings.chips);
        return;
      }

      if (target.closest(".ono-by-one")) {
        this._settings.againstsWho = "user";
        this._showToast("one by one", "chip__who", this._settings.chips);
        return;
      }

      if (target.closest(".weapoon-x")) {
        this._settings.userWeapoon = "x";
        this._showToast("your weapoon \"X\"", "chip__weapoon", this._settings.chips);
        return;
      }

      if (target.closest(".weapoon-o")) {
        this._settings.userWeapoon = "o";
        this._showToast("your weapoon \"O\"", "chip__weapoon", this._settings.chips);
        return;
      }

      if (target.closest(".btn-paly")) {
        this._start();
        return;
      }
    }
  }, {
    key: "_getPopupItem",
    value: function _getPopupItem(e) {
      var target = e.target;

      if (target.closest(".game-popup__close")) {
        this._end();
        return;
      }
    }
  }, {
    key: "_start",
    value: function _start() {
      if (this._isGame) return;

      // this._gamePopup.hidden = false;
      this._isGame = true;

      this._game._setAgainstWho(this._settings.againstsWho);
      this._game._setUsersType(this._settings.userWeapoon);
      console.log(this._game);

      console.log("start");
    }
  }, {
    key: "_clearGameData",
    value: function _clearGameData() {
      // reset User constructor
      var users = this._game._users;

      for (var user in users) {
        users[user]._score = 0;
        document.querySelector(".users__user-" + user).innerHTML = 0;
      }

      // reset Lobby constructor
      this._settings.userWeapoon = "x";
      this._settings.againstsWho = "computer";
      this._showToast("against ai", "chip__who", this._settings.chips);
      this._showToast("your weapoon \"X\"", "chip__weapoon", this._settings.chips);

      // reset Game constructor
      this._game._isComputerMove = false;
      this._game._activeUser = 1;
      this._game._gameCounter = 0;
      this._game._refreshGame();
      this._game._logs = [];
      this._game._stepsForLog = [];
    }
  }, {
    key: "_end",
    value: function _end() {
      // this._gamePopup.hidden = true;
      $('#game-modal').closeModal();
      this._isGame = false;
      this._clearGameData();
      console.log("end");
    }
  }, {
    key: "_init",
    value: function _init() {
      this._game = new Game({
        field: new Field(this._field),
        user1: new User({ type: "x" }),
        user2: new User({ type: "o" })
      });
    }
  }]);

  return Lobby;
}();

var lobby = new Lobby();