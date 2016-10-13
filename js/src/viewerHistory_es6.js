class ViewerHistory {
  constructor({trigger, view}) {
    this._trigger = trigger;
    this._view = view;
    this.logs;

    view.addEventListener("click", this._getViewItem.bind(this));
    view.querySelector(".history__viewer").addEventListener("click", this._getGame.bind(this));
  }

  _showViewerHistory(logs) {
    this._view.classList.add("open");
    this._logs = logs;

    this._renderListOfHistory(logs);
  }

  _closeViewerHistory(e) {
    this._view.classList.remove("open");
  }

  _clear() {
    document.querySelector(".history__viewer-view").innerHTML ="";
  }

  _getViewItem(e) {
    let target = e.target;

    if (target.closest('.history__close')) {
      this._view.classList.remove("open");
      this._clear();
    }
  }

  _renderListOfHistory(logs) {
    let viewer = document.querySelector(".history__viewer");
    let ul = document.createElement("ul");

    ul.className = "logs collection";

    for (let i = 0; i < logs.length; i++) {
      let li = document.createElement("li");

      li.className = "log__item collection-item";
      if (i === logs.length - 1) {
        li.classList.add("active");
      }
      li.innerHTML = `Game № ${i + 1}`;
      li.numLog = i;
      ul.appendChild(li);
    }

    viewer.querySelector(".history__viewer-list").innerHTML = "";
    viewer.querySelector(".history__viewer-list").appendChild(ul);

    this._showFullLog(logs[logs.length - 1]);

  }

  _getGame(e) {
    let target = e.target;

    if (target.closest('.log__item')) {
      let ul = target.parentNode;

      for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].classList.remove("active");
      }

      target.classList.add("active");
      this._showFullLog(this._logs[target.numLog]); // why a, not li

      return;
    }
  }

  _showFullLog(log) { // param object
    let field = document.querySelector(".field");
    let wrapper = document.createElement("div");

    for (let i = 0; i < log.steps.length; i++) {
      let logItem = log.steps[i];
      let fieldItem = field.cloneNode(true);
      let fieldItemCells = fieldItem.getElementsByClassName("field__cels");

      fieldItem.classList.add("log-field");

      for (let i = 0; i < logItem.length; i++) {
        fieldItemCells[i].innerHTML = logItem[i];
      }

      wrapper.appendChild(fieldItem);
    }

    document.querySelector(".history__viewer-view").innerHTML = "";
    document.querySelector(".history__viewer-view").appendChild(wrapper);

    wrapper.parentNode.scrollTop = wrapper.parentNode.scrollHeight;

  }
}