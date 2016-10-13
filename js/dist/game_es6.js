"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var user1 = _ref.user1;
    var user2 = _ref.user2;
    var field = _ref.field;
    var _ref$againstsWho = _ref.againstsWho;
    var againstsWho = _ref$againstsWho === undefined ? "computer" : _ref$againstsWho;
    var brain = _ref.brain;
    var viewerHistory = _ref.viewerHistory;

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
    this._brain = brain;
    this._viewerHistory = viewerHistory;

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

      for (var i = 0; i < users.length; i++) {
        users[i].classList.remove("active");
      }

      document.querySelector(".users__user-" + activeUser).parentNode.classList.add("active");
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
          this._makeComputerMove(this._brain._think(this._field._field, this._users));
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

      for (var i = 0; i < field.length; i++) {
        field[i] = "";
        cells[i]._marked = false;
        cells[i].classList.add("no-marked");
      }

      this._field._renderState(field, cells);
      this._activeUser = 1;
      this._stepsForLog = [];
      this._renderTotalGames();
      this._renderDeadHeat();
      this._markActiveUser(this._activeUser);
      if (this._logs.length) {
        document.querySelector(".trigger-history").classList.remove("disabled");
      } else {
        document.querySelector(".trigger-history").classList.add("disabled");
      }
    }
  }, {
    key: "_gameReset",
    value: function _gameReset() {
      this._isComputerMove = false;
      this._gameCounter = 0;
      this._deadHeat = 0;
      this._logs = [];
      this._refreshGame();
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