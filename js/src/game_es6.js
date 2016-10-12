class Game {
  constructor({user1, user2, field, againstsWho = "computer", brain} = {}) {
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

    console.log("game is created");

    this._field._elem.addEventListener("click", this._manager.bind(this));
  }

  _renderTotalGames() {
    document.querySelector(".users__total-games span").innerHTML = this._gameCounter;
  }

  _renderDeadHeat() {
    document.querySelector(".users__dead-heat span").innerHTML = this._deadHeat;
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

  _markActiveUser(activeUser) {
    let users = document.querySelectorAll(".users__item");

    for (let i = 0; i < users.length; i++) {
      users[i].classList.remove("active");
    }

    document.querySelector(".users__user-" + activeUser).parentNode.classList.add("active");
  }

  _makeComputerMove(cellNumber) {
    this._isComputerMove = true;

    this._brainTimer = setTimeout(() => {
      this._field._setMark(cellNumber, this._users[this._activeUser]._type);
      this._checkGameState();
      this._isComputerMove = false;
      console.log("end AI move");

      if (this._isGaveOver) {
        this._isGaveOver = false;
        return;
      }

      this._changeUser();
    }, 500);
  }

  _setUsersType(value) {
    let users = this._users;

    if (value === "x") {
      users[1]._type = "x";
      users[2]._type = "o";
      document.querySelector(".users__user-1").closest('.users__item').firstChild.data = "x";
      document.querySelector(".users__user-2").closest('.users__item').firstChild.data = "o";
    }

    if (value === "o"){
      users[1]._type = "o";
      users[2]._type = "x";
      document.querySelector(".users__user-1").closest('.users__item').firstChild.data = "o";
      document.querySelector(".users__user-2").closest('.users__item').firstChild.data = "x";
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
        this._makeComputerMove(this._brain._think(this._field._field));
      }

      return;
    }
  }

  _blockField(cells) {
    cells.forEach(cell => {
      if(!cell._marked) {
        cell._marked = true
        cell.classList.remove("no-marked");
      }
    });
  }

  _checkGameState() {
    this._stepsForLog.push(this._field._field.slice());

    if (this._field._isWinner(this._field._field)) {
      this._users[this._activeUser]._score += 1;
      this._users[this._activeUser]._render(this._activeUser, this._users[this._activeUser]._score);
      this._writeLog(true, this._field._field, this._stepsForLog);
      this._isGaveOver = true;
      this._gameCounter++;
      this._blockField(this._field._cells);
      Materialize.toast('Palyer ' + this._users[this._activeUser]._type + " win!", 1500,'',() => {
        this._refreshGame();
      });
    }

    if (!this._field._isWinner(this._field._field) && this._field._isOverGame(this._field._field)) {
      this._writeLog(false, this._field._field, this._stepsForLog);
      this._isGaveOver = true;
      this._gameCounter++;
      this._deadHeat++;
      Materialize.toast('there is no winners', 1500,'',() => {
        console.log('there is no winners');
        this._refreshGame();
      });

    }
  }

  _refreshGame() {
    let field = this._field._field;
    let cells = this._field._cells;

    for (let i = 0; i < field.length; i++) {
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
  }

  _gameReset() {
    this._isComputerMove = false;
    this._gameCounter = 0;
    this._deadHeat = 0;
    this._refreshGame();
    this._logs = [];
    clearTimeout(this._brainTimer);
  }

  _changeUser() {
    if (this._activeUser === 1) {
      this._activeUser = 2;
    } else {
      this._activeUser = 1;
    }

    this._markActiveUser(this._activeUser);
  }
}