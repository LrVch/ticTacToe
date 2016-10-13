"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      for (var _i = 0; _i < this._field.length; _i++) {
        this._field[_i] = "";
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