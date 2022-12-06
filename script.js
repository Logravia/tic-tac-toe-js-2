// Updates the state of the gameboard and informs you of the state it is in
// E.g. whether move is legal, where the tokens are places
// and whether victory or tie been achieved
const gameBoard = (function () {
  const generateBoard = function () {
    return [[null, null, null],
    [null, null, null],
    [null, null, null]];
  }

  let board = generateBoard()

  const x_max = 2;
  const y_max = 2;

  let between = function (x, min, max) {
    return x >= min && x <= max;
  }

  let isLegal = function (x, y) {
    if (!between(x, 0, x_max) || !between(y, 0, y_max)){
      console.log("Outside of bounds!")
      return false;
    }
    if (board[y][x] !== null) {
      console.log("Place taken!");
      return false;
    }
    return true;
  }

  let putSymbol = function (symbol, x, y) {
    if (isLegal(x,y)){
      board[y][x] = symbol;
    }
  }

  clear = function () {
    board = generateBoard();
  }

  const allSame = function (arr) {
    return arr.every(e=>arr[0] === e)
  };

  const noNullFoundIn = function (arr) {
    return arr.every(e=>e !== null);
  }

  const noBlanks = function () {
    return board.every(row=>noNullFoundIn(row));
  }

  // turns rown into columns
  const transpose = function(arr) {
    return Object.keys(arr[0]).map(function(c) {
        return arr.map(function(r) { return r[c]; });
    });
}

  const checkHorizontalWin = function (board) {
    return board.some(row=>allSame(row) && noNullFoundIn(row));
  };

  const checkVerticalWin = function () {
    let rotatedBoard = transpose(board);
    return checkHorizontalWin(rotatedBoard);
  }

  const checkDiagonalWin = function () {
    leftDiag = [board[0][0],board[1][1], board[2][2]];
    rightDiag = [board[0][2], board[1][1], board[2][0]];
    return checkHorizontalWin([leftDiag,rightDiag]);
  }

  const isVictory = function () {
    return checkHorizontalWin(board) || checkVerticalWin() || checkDiagonalWin()
  }

  const isTie = function () {
    return noBlanks() && !isVictory();
  };

  return { putSymbol, clear, board, isTie, isVictory}
})();
