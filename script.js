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

  return { putSymbol, clear, board }
})();
