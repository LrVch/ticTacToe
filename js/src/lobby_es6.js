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

  _showChip(mess, checkClass, chips) {
    let chip = chips.querySelector("." + checkClass);

    chip.innerHTML = mess;
  }

  _getSettingsItem(e) {
    let target = e.target;

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

  _getPopupItem(e) {
    let target = e.target;

    if (target.closest(".game-popup__close")) {
      this._end();
      return;
    }
  }

  _start() {
    if (this._isGame) return;

    this._isGame = true;

    this._game._setAgainstWho(this._settings.againstsWho);
    this._game._setUsersType(this._settings.userWeapoon);
    console.log(this._game)

    console.log("start");
  }

  _resetLobby() {
    this._settings.userWeapoon = "x";
    this._settings.againstsWho = "computer";
    this._showChip("against ai", "chip__who", this._settings.chips);
    this._showChip("your weapoon \"" + this._settings.userWeapoon + "\"", "chip__weapoon", this._settings.chips);
  }

  _restoreGameData() {
    // reset User constructor
    let users = this._game._users;

    for (let user in users) {
      users[user]._score = 0;
      document.querySelector(".users__user-" + user).innerHTML = 0;
    }

    // reset Lobby constructor
    this._resetLobby();

    // reset Game constructor
    this._game._gameReset();
  }

  _end() {
    $('#game-modal').closeModal();
    this._isGame = false;
    this._restoreGameData();
    console.log("end");
  }

  _init() {
    this._game = new Game({
      field: new Field(this._field),
      user1: new User({type: "x"}),
      user2: new User({type: "o"}),
      brain: new Brain()
    });
  }
}


let lobby = new Lobby();