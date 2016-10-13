class Brain {
  constructor() {
    this._threeInARow = [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ],
      [ 0, 3, 6 ],
      [ 1, 4, 7 ],
      [ 2, 5, 8 ],
      [ 0, 4, 8 ],
      [ 2, 4, 6 ]
    ];
    this._heuristicArray = [
      [     0,   -10,  -100, -1000 ],
      [    10,     0,     0,     0 ],
      [   100,     0,     0,     0 ],
      [  1000,     0,     0,     0 ]
    ];
  }

  _evaluatePosition(board, player) {
    let opponent = player;
    let piece;
    let players, others;
    let t = 0, i, j;

    for (let i = 0; i < 8; i++)  {
      players = others = 0;

      for (let j = 0; j < 3; j++)  {
        piece = board[this._threeInARow[i][j]];

        if (piece == player)
          players++;
        else if (piece == opponent)
          others++;
      }

      t += this._heuristicArray[players][others];
    }
    return t;
  }

  _getCell(board, activeUser) {
    let cell = 0;
    let max = 0;
    let tempBoard = [];
    let result = {cell: 0, max: 0};

    for (let i = 0; i < board.length; i++) {
      tempBoard = board.slice();

      if (tempBoard[i] === "") {
        tempBoard[i] = activeUser;
      }

      let value = this._evaluatePosition(tempBoard, activeUser);

      if (max < value) {
        max = value;
        result.cell = i;
        result.max = value;
      }

      console.log(max)
      console.log(tempBoard);
    }
      console.log(result);
      return result;
  }

  _think(board, users) {
    let user = this._getCell(board, users[2]._type);
    let ai = this._getCell(board, users[1]._type);

    console.log("user", user)
    console.log("ai", ai)

    let cell = (user.max > ai.max) ? user.cell : ai.cell;

    console.log("cell", cell);

    return cell;
  }
}