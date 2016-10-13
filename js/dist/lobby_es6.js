"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      if (target.closest(".trigger-history")) {
        if (!this._game._logs.length) {
          return;
        }
        this._game._viewerHistory._showViewerHistory(this._game._logs);
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
        user2: new User({ type: "o" }),
        brain: new Brain(),
        viewerHistory: new ViewerHistory({
          trigger: document.querySelector(".trigger-history"),
          view: document.querySelector(".history")
        })
      });
    }
  }]);

  return Lobby;
}();

var lobby = new Lobby();