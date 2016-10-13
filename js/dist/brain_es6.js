"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brain = function () {
  function Brain() {
    _classCallCheck(this, Brain);
  }

  _createClass(Brain, [{
    key: "_think",
    // TODO very stupid brain, fix it
    value: function _think(field) {
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
  }]);

  return Brain;
}();