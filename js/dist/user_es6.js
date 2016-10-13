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