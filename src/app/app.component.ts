import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data tables app';

  // public variable for data to be used front end
  public board:any = [];

  constructor() {

    let rows = 10;
    let cols = 10;
    let mines = 18;
    let totalSquares = rows * cols;
    let bombsArray:any = [];

// generate random numbers, these are the squares on the board the bombs will go on
    while(bombsArray.length < mines){
      var randomnumber = Math.floor(Math.random()*100) + 1;
      if(bombsArray.indexOf(randomnumber) > -1) continue;
      bombsArray[bombsArray.length] = randomnumber;
    }

    // set bombs
    for (var i = 1; i <= totalSquares; i++) {
      if (bombsArray.includes(i)) {
        this.board.push({ square: i, bomb: true, bombsNear: 0 })
      } else {
        this.board.push({ square: i, bomb: false, bombsNear: 0 });
      }
    }

    // go through each square that doesn't have a bomb and set find surrounding bombs
    this.board.forEach((square) => {
      if (square.bomb == false) {
        // check bombs near
        checkForBomb(square);
      }
    });

    // function to check for surrounding bombs
    function checkForBomb(square) {

      let bombsNear = 0;

      // check its not a square on the edge, left or right
      if ((square.square % rows) != 0 && ((square.square - 1) % rows) != 0) {

        // check squares left/right of current location
        bombsArray.includes(square.square + 1) ? bombsNear++ : null;
        bombsArray.includes(square.square - 1) ? bombsNear++ : null;

        // checks we are still on board, good pun.
        if (square.square + rows! < totalSquares) {
          // checks the squares below, bottom left and bottom right of itself
          var below = square.square + rows;
          bombsArray.includes(below) ? bombsNear++ : null;
          bombsArray.includes(below + 1) ? bombsNear++ : null;
          bombsArray.includes(below - 1) ? bombsNear++ : null;
        }

        // checks we are still on board
        if (square.square - rows! > 0) {
          // checks the squares above, top left and top right of itself
          var above = square.square - rows;
          bombsArray.includes(above) ? bombsNear++ : null;
          bombsArray.includes(above + 1) ? bombsNear++ : null;
          bombsArray.includes(above - 1) ? bombsNear++ : null;
        }

        // else if - don't check to the left as it would be a previous row
      } else if ((square.square % rows) != 0) {
        bombsArray.includes(square.square + 1) ? bombsNear++ : null;

        // checks we are still on board, good pun.
        if (square.square + rows! < totalSquares) {
          // checks the squares below, bottom left and bottom right of itself
          var below = square.square + rows;
          bombsArray.includes(below) ? bombsNear++ : null;
          bombsArray.includes(below + 1) ? bombsNear++ : null;
        }

        // checks we are still on board
        if (square.square - rows! > 0) {
          // checks the squares above, top left and top right of itself
          var above = square.square - rows;
          bombsArray.includes(above) ? bombsNear++ : null;
          bombsArray.includes(above + 1) ? bombsNear++ : null;
        }
        // else if - don't check to the right as it would be next row
      } else {

        bombsArray.includes(square.square - 1) ? bombsNear++ : null;

        // checks we are still on board, good pun.
        if (square.square + rows! < totalSquares) {
          // checks the squares below, bottom left and bottom right of itself
          var below = square.square + rows;
          bombsArray.includes(below) ? bombsNear++ : null;
          bombsArray.includes(below - 1) ? bombsNear++ : null;
        }

        // checks we are still on board
        if (square.square - rows! > 0) {
          // checks the squares above, top left and top right of itself
          var above = square.square - rows;
          bombsArray.includes(above) ? bombsNear++ : null;
          bombsArray.includes(above - 1) ? bombsNear++ : null;
        }
      }

      square.bombsNear = bombsNear;

    }

  }

  ngOnInit(){

  }

}
