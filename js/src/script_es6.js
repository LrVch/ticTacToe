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

class Game {
  constructor({user1, user2, field, againstsWho = "computer"} = {}) {
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

  _writeLog(isWinner, field, steps) {
    let winer;

    if (isWinner) {
      winer = this._users[this._activeUser];
    } else {
      winer = "there is no winners";
    }

    this._logs.push({
      winer: winer,
      field: field.slice(),
      steps: steps.slice(),
      formatField(field) {
        let result = '';

        field.forEach((cell, i) => {
          if (cell === "") cell = ".";

          if ((i + 1)%3 === 0 && i !== 8) {
            result += cell + "\n ";
          } else {
            result += cell + " ";
          }
        });

        return result.slice(0, -1);
      },
      getFormatedField() {
        return this.formatField(this.field);
      },
      getFormatedSteps() {
        let result = "";

        this.steps.forEach((step, i) => {
          if (i > 0) {
            result += " ";
          }

          result += this.formatField(step) + "\n" + "(" + (i + 1) + ")" + "=".repeat(20) + "\n";
        });

        return result;
      }
    });
  }

  _brain() {
    let field = this._field._field;
    let cells = this._field._cells;
    let cellNeedMark = "";

    if (field[4] === "") {
      console.log("hard");
      cellNeedMark = 4;
    } else {
      while(true) {
        let cellNum = Math.round(Math.random() * 9);

        if (field[cellNum] === "") {
          console.log("easy");
          cellNeedMark = cellNum;
          break;
        }
      }
    }
    setTimeout(() => {
      this._field._setMark(cellNeedMark, this._users[this._activeUser]._type);
      this._checkGameState();
      this._changeUser();
      this._isComputerMove = false;
      console.log("end AI move");

      if (this._isGaveOver) {
        this._isGaveOver = false;
        return;
      }
    }, 1000);
  }

  _setUsersType(value) {
    let users = this._users;

    if (value === "x") {
      users[1]._type = "x";
      users[2]._type = "o";
    }

    if (value === "o"){
      users[1]._type = "o";
      users[2]._type = "x";
    }
  }

  _setAgainstWho(value) {
    if (value !== "user" && value !== "computer") return;

    this._againstsWho = value;
  }

  _manager(e) {
   let target = e.target;

    if (target.closest(".field__cels")) {
      if (this._isComputerMove) return;

      let cell = target.getAttribute("data-cell-num");

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

  _checkGameState() {
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

  _refreshGame() {
    let field = this._field._field;
    let cells = this._field._cells;

    for (let i = 0; i < field.length; i++) {
      field[i] = "";
      cells[i]._marked = false;
    }

    this._field._renderState(field, cells);
    this._activeUser = 1;
    this._stepsForLog = [];
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

  _clear() {
    for (let i = 0; i < this._field.length; i++) {
      this._field[i] = "";
    }
    this._cells.forEach(cell => {
      cell.innerHTML = "";
      cell._marked = false;
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

  _isOverGame(field) {
    return field.every(cell => cell !== "");
  }
}

class Lobby {
  constructor() {
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

  _showToast(mess, checkClass, chips) {
    let chip = chips.querySelector("." + checkClass);

    chip.innerHTML = mess;
  }

  _getSettingsItem(e) {
    let target = e.target;

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

  _getPopupItem(e) {
    let target = e.target;

    if (target.closest(".game-popup__close")) {
      this._end();
      return;
    }
  }

  _start() {
    if (this._isGame) return;

    // this._gamePopup.hidden = false;
    this._isGame = true;

    this._game._setAgainstWho(this._settings.againstsWho);
    this._game._setUsersType(this._settings.userWeapoon);
    console.log(this._game)

    console.log("start");
  }

  _clearGameData() {
    // reset User constructor
    let users = this._game._users;

    for (let user in users) {
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

  _end() {
    // this._gamePopup.hidden = true;
    $('#game-modal').closeModal();
    this._isGame = false;
    this._clearGameData();
    console.log("end");
  }

  _init() {
    this._game = new Game({
      field: new Field(this._field),
      user1: new User({type: "x"}),
      user2: new User({type: "o"})
    });
  }
}


let lobby = new Lobby();


