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
    this._brainTimer;
    this._deadHeat = 0;

    console.log("game is created");

    this._field._elem.addEventListener("click", this._manager.bind(this));
  }

  _createClass(Game, [{
    key: "_renderTotalGames",
    value: function _renderTotalGames() {
      document.querySelector(".users__total-games span").innerHTML = this._gameCounter;
    }
  }, {
    key: "_renderDeadHeat",
    value: function _renderDeadHeat() {
      document.querySelector(".users__dead-heat span").innerHTML = this._deadHeat;
    }
  }, {
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
    key: "_markActiveUser",
    value: function _markActiveUser(activeUser) {
      var users = document.querySelectorAll(".users__item");

      for (var _i = 0; _i < users.length; _i++) {
        users[_i].classList.remove("active");
      }

      document.querySelector(".users__user-" + activeUser).parentNode.classList.add("active");
    }
  }, {
    key: "_brain",
    value: function _brain() {
      // TODO very stupid brain, fix it
      var field = this._field._field;
      var cells = this._field._cells;
      var cellNeedMark = "";

      if (field[4] === "") {
        cellNeedMark = 4;
      } else {
        while (true) {
          var cellNum = Math.round(Math.random() * 9);

          if (field[cellNum] === "") {
            cellNeedMark = cellNum;
            break;
          }
        }
      }

      return cellNeedMark;
    }
  }, {
    key: "_makeComputerMove",
    value: function _makeComputerMove(cellNumber) {
      var _this2 = this;

      this._isComputerMove = true;

      this._brainTimer = setTimeout(function () {
        _this2._field._setMark(cellNumber, _this2._users[_this2._activeUser]._type);
        _this2._checkGameState();
        _this2._isComputerMove = false;
        console.log("end AI move");

        if (_this2._isGaveOver) {
          _this2._isGaveOver = false;
          return;
        }

        _this2._changeUser();
      }, 500);
    }
  }, {
    key: "_setUsersType",
    value: function _setUsersType(value) {
      var users = this._users;

      if (value === "x") {
        users[1]._type = "x";
        users[2]._type = "o";
        document.querySelector(".users__user-1").closest('.users__item').firstChild.data = "x";
        document.querySelector(".users__user-2").closest('.users__item').firstChild.data = "o";
      }

      if (value === "o") {
        users[1]._type = "o";
        users[2]._type = "x";
        document.querySelector(".users__user-1").closest('.users__item').firstChild.data = "o";
        document.querySelector(".users__user-2").closest('.users__item').firstChild.data = "x";
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
          this._makeComputerMove(this._brain());
        }
        return;
      }
    }
  }, {
    key: "_blockField",
    value: function _blockField(cells) {
      cells.forEach(function (cell) {
        if (!cell._marked) {
          cell._marked = true;
          cell.classList.remove("no-marked");
        }
      });
    }
  }, {
    key: "_checkGameState",
    value: function _checkGameState() {
      var _this3 = this;

      this._stepsForLog.push(this._field._field.slice());

      if (this._field._isWinner(this._field._field)) {
        this._users[this._activeUser]._score += 1;
        this._users[this._activeUser]._render(this._activeUser, this._users[this._activeUser]._score);
        this._writeLog(true, this._field._field, this._stepsForLog);
        this._isGaveOver = true;
        this._gameCounter++;
        this._blockField(this._field._cells);
        Materialize.toast('Palyer ' + this._users[this._activeUser]._type + " win!", 1500, '', function () {
          _this3._refreshGame();
        });
      }

      if (!this._field._isWinner(this._field._field) && this._field._isOverGame(this._field._field)) {
        this._writeLog(false, this._field._field, this._stepsForLog);
        this._isGaveOver = true;
        this._gameCounter++;
        this._deadHeat++;
        Materialize.toast('there is no winners', 1500, '', function () {
          console.log('there is no winners');
          _this3._refreshGame();
        });
      }
    }
  }, {
    key: "_refreshGame",
    value: function _refreshGame() {
      var field = this._field._field;
      var cells = this._field._cells;

      for (var _i2 = 0; _i2 < field.length; _i2++) {
        field[_i2] = "";
        cells[_i2]._marked = false;
        cells[_i2].classList.add("no-marked");
      }

      this._field._renderState(field, cells);
      this._activeUser = 1;
      this._stepsForLog = [];
      this._renderTotalGames();
      this._renderDeadHeat();
      this._markActiveUser(this._activeUser);
    }
  }, {
    key: "_gameReset",
    value: function _gameReset() {
      this._isComputerMove = false;
      this._gameCounter = 0;
      this._deadHeat = 0;
      this._refreshGame();
      this._logs = [];
      clearTimeout(this._brainTimer);
    }
  }, {
    key: "_changeUser",
    value: function _changeUser() {
      if (this._activeUser === 1) {
        this._activeUser = 2;
      } else {
        this._activeUser = 1;
      }

      this._markActiveUser(this._activeUser);
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
          cells[i].classList.remove("no-marked");
        }

        cells[i].innerHTML = elem;
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      for (var _i3 = 0; _i3 < this._field.length; _i3++) {
        this._field[_i3] = "";
      }
      this._cells.forEach(function (cell) {
        cell.innerHTML = "";
        cell._marked = false;
        cells[i].classList.add("no-marked");
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
    key: "_showChip",
    value: function _showChip(mess, checkClass, chips) {
      var chip = chips.querySelector("." + checkClass);

      chip.innerHTML = mess;
    }
  }, {
    key: "_getSettingsItem",
    value: function _getSettingsItem(e) {
      var target = e.target;

      if (target.closest(".against-computer")) {
        this._settings.againstsWho = "computer";
        this._showChip("against ai", "chip__who", this._settings.chips);
        return;
      }

      if (target.closest(".ono-by-one")) {
        this._settings.againstsWho = "user";
        this._showChip("one by one", "chip__who", this._settings.chips);
        return;
      }

      if (target.closest(".weapoon-x")) {
        this._settings.userWeapoon = "x";
        this._showChip("your weapoon \"" + this._settings.userWeapoon + "\"", "chip__weapoon", this._settings.chips);
        return;
      }

      if (target.closest(".weapoon-o")) {
        this._settings.userWeapoon = "o";
        this._showChip("your weapoon \"" + this._settings.userWeapoon + "\"", "chip__weapoon", this._settings.chips);
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

      this._isGame = true;

      this._game._setAgainstWho(this._settings.againstsWho);
      this._game._setUsersType(this._settings.userWeapoon);
      console.log(this._game);

      console.log("start");
    }
  }, {
    key: "_resetLobby",
    value: function _resetLobby() {
      this._settings.userWeapoon = "x";
      this._settings.againstsWho = "computer";
      this._showChip("against ai", "chip__who", this._settings.chips);
      this._showChip("your weapoon \"" + this._settings.userWeapoon + "\"", "chip__weapoon", this._settings.chips);
    }
  }, {
    key: "_restoreGameData",
    value: function _restoreGameData() {
      // reset User constructor
      var users = this._game._users;

      for (var user in users) {
        users[user]._score = 0;
        document.querySelector(".users__user-" + user).innerHTML = 0;
      }

      // reset Lobby constructor
      this._resetLobby();

      // reset Game constructor
      this._game._gameReset();
    }
  }, {
    key: "_end",
    value: function _end() {
      $('#game-modal').closeModal();
      this._isGame = false;
      this._restoreGameData();
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