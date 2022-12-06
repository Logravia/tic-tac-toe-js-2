// Updates the state of the gameboard and informs you of the state it is in
// E.g. whether move is legal, where the tokens are places
// and whether victory or tie been achieved
const board = (function () {
  const generateBoard = function () {
    return [["X", null, null],
    [null, null, null],
    [null, null, null]];
  }

  let state = generateBoard()

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
    if (state[y][x] !== null) {
      console.log("Place taken!");
      return false;
    }
    return true;
  }

  let putSymbol = function (symbol, x, y) {
    if (isLegal(x,y)){
      state[y][x] = symbol;
    }
  }

  clear = function () {
    state = generateBoard();
  }

  const allSame = function (arr) {
    return arr.every(e=>arr[0] === e)
  };

  const noNullFoundIn = function (arr) {
    return arr.every(e=>e !== null);
  }

  const noBlanks = function () {
    return state.every(row=>noNullFoundIn(row));
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
    let rotatedBoard = transpose(state);
    return checkHorizontalWin(rotatedBoard);
  }

  const checkDiagonalWin = function () {
    leftDiag = [state[0][0],state[1][1], state[2][2]];
    rightDiag = [state[0][2], state[1][1], state[2][0]];
    return checkHorizontalWin([leftDiag,rightDiag]);
  }

  const isVictory = function () {
    return checkHorizontalWin(state) || checkVerticalWin() || checkDiagonalWin()
  }

  const isTie = function () {
    return noBlanks() && !isVictory();
  };

  return { putSymbol, clear, state, isTie, isVictory}
})();

const display = (function(board){
  htmlGameboard = document.querySelector(".gameboard");

  const drawGrid = function(){
    for (let y = 0; y < board.state.length; y++) {
      for (let x = 0; x < board.state[y].length; x++) {
        sqr = document.createElement("div");
        sqr.innerHTML = board.state[y][x];
        sqr.setAttribute("x", x);
        sqr.setAttribute("y", y);
        htmlGameboard.appendChild(sqr);
      }
    }
  }

  const clear = function() {
    htmlGameboard.replaceChildren();
  }

  return {drawGrid, clear}

})(board);

display.drawGrid();

const controls = (function (game) {
  const squares = document.querySelectorAll(".square");

  const addListeners = function () {
    squares.forEach(square=>{
      square.addEventListener('click', (event)=>{
        let x = Number(event.currentTarget.getAttribute("x"));
        let y = Number(event.currentTarget.getAttribute("y"));
        game.handleClick(x,y, event.currentTarget)
      })
    })
  };

  addListeners();
  return {addListeners}
})(game);
