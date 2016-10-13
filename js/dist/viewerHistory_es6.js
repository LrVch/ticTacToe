"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewerHistory = function () {
  function ViewerHistory(_ref) {
    var trigger = _ref.trigger;
    var view = _ref.view;

    _classCallCheck(this, ViewerHistory);

    this._trigger = trigger;
    this._view = view;
    this.logs;

    view.addEventListener("click", this._getViewItem.bind(this));
    view.querySelector(".history__viewer").addEventListener("click", this._getGame.bind(this));
  }

  _createClass(ViewerHistory, [{
    key: "_showViewerHistory",
    value: function _showViewerHistory(logs) {
      this._view.classList.add("open");
      this._logs = logs;

      this._renderListOfHistory(logs);
    }
  }, {
    key: "_closeViewerHistory",
    value: function _closeViewerHistory(e) {
      this._view.classList.remove("open");
    }
  }, {
    key: "_clear",
    value: function _clear() {
      document.querySelector(".history__viewer-view").innerHTML = "";
    }
  }, {
    key: "_getViewItem",
    value: function _getViewItem(e) {
      var target = e.target;

      if (target.closest('.history__close')) {
        this._view.classList.remove("open");
        this._clear();
      }
    }
  }, {
    key: "_renderListOfHistory",
    value: function _renderListOfHistory(logs) {
      var viewer = document.querySelector(".history__viewer");
      var ul = document.createElement("ul");

      ul.className = "logs collection";

      for (var i = 0; i < logs.length; i++) {
        var li = document.createElement("li");

        li.className = "log__item collection-item";
        if (i === logs.length - 1) {
          li.classList.add("active");
        }
        li.innerHTML = "Game \u2116 " + (i + 1);
        li.numLog = i;
        ul.appendChild(li);
      }

      viewer.querySelector(".history__viewer-list").innerHTML = "";
      viewer.querySelector(".history__viewer-list").appendChild(ul);

      ul.parentNode.scrollTop = ul.parentNode.scrollHeight;

      this._showFullLog(logs[logs.length - 1]);
    }
  }, {
    key: "_getGame",
    value: function _getGame(e) {
      var target = e.target;

      if (target.closest('.log__item')) {
        var ul = target.parentNode;

        for (var i = 0; i < ul.children.length; i++) {
          ul.children[i].classList.remove("active");
        }

        target.classList.add("active");
        this._showFullLog(this._logs[target.numLog]); // why a, not li

        return;
      }
    }
  }, {
    key: "_showFullLog",
    value: function _showFullLog(log) {
      // param object
      var field = document.querySelector(".field");
      var wrapper = document.createElement("div");

      for (var i = 0; i < log.steps.length; i++) {
        var logItem = log.steps[i];
        var fieldItem = field.cloneNode(true);
        var fieldItemCells = fieldItem.getElementsByClassName("field__cels");

        fieldItem.classList.add("log-field");

        for (var _i = 0; _i < logItem.length; _i++) {
          fieldItemCells[_i].innerHTML = logItem[_i];
        }

        wrapper.appendChild(fieldItem);
      }

      document.querySelector(".history__viewer-view").innerHTML = "";
      document.querySelector(".history__viewer-view").appendChild(wrapper);

      wrapper.parentNode.scrollTop = wrapper.parentNode.scrollHeight;
    }
  }]);

  return ViewerHistory;
}();