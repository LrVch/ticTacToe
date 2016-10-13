"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brain = function () {
  function Brain() {
    _classCallCheck(this, Brain);

    this._threeInARow = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    this._heuristicArray = [[0, -10, -100, -1000], [10, 0, 0, 0], [100, 0, 0, 0], [1000, 0, 0, 0]];
  }

  _createClass(Brain, [{
    key: "_evaluatePosition",
    value: function _evaluatePosition(board, player) {
      var opponent = player;
      var piece = void 0;
      var players = void 0,
          others = void 0;
      var t = 0,
          i = void 0,
          j = void 0;

      for (var _i = 0; _i < 8; _i++) {
        players = others = 0;

        for (var _j = 0; _j < 3; _j++) {
          piece = board[this._threeInARow[_i][_j]];

          if (piece == player) players++;else if (piece == opponent) others++;
        }

        t += this._heuristicArray[players][others];
      }
      return t;
    }
  }, {
    key: "_getCell",
    value: function _getCell(board, activeUser) {
      var cell = 0;
      var max = 0;
      var tempBoard = [];
      var result = { cell: 0, max: 0 };

      for (var i = 0; i < board.length; i++) {
        tempBoard = board.slice();

        if (tempBoard[i] === "") {
          tempBoard[i] = activeUser;
        }

        var value = this._evaluatePosition(tempBoard, activeUser);

        if (max < value) {
          max = value;
          result.cell = i;
          result.max = value;
        }

        console.log(max);
        console.log(tempBoard);
      }
      console.log(result);
      return result;
    }
  }, {
    key: "_think",
    value: function _think(board, users) {
      var user = this._getCell(board, users[2]._type);
      var ai = this._getCell(board, users[1]._type);

      console.log("user", user);
      console.log("ai", ai);

      var cell = user.max > ai.max ? user.cell : ai.cell;

      console.log("cell", cell);

      return cell;
    }
  }]);

  return Brain;
}();