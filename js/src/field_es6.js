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
        cells[i].classList.remove("no-marked");
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
      cells[i].classList.add("no-marked");
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