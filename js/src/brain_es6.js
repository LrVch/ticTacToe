class Brain { // TODO very stupid brain, fix it
  _think(field) {
    let cellNeedMark = "";

    if (field[4] === "") {
      cellNeedMark = 4;
    } else {
      while(true) {
        let cellNum = Math.round(Math.random() * 9);

        if (field[cellNum] === "") {
          cellNeedMark = cellNum;
          break;
        }
      }
    }

    return cellNeedMark;
  }
}