/*eslint-disable*/

import React, { Component } from 'react';
import '../styles/TicTacToe.css';

class TicTacToe extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      highlightGrid: [],
      tableSize: 3,
      turn: 0,
      message: 'A new game begins. Your move.',
      mode: 'impossible',
      player: 1, // default is 1
      gameType: 'computer',
      settings: false,
      endGame: false,
      pending: false,
      wins: 0,
      losses: 0,
      ties: 0
    }
  }

  componentDidMount() {
    let grid = this.createTable(this.state.tableSize);
    this.setState({grid, highlightGrid: grid, endGame: false});
  }

  /*********
  initializes a 2 dimensional array with the given size
  *********/
  createTable(size) {
    let grid = [];
    for (let i=0; i<size; i++) {
      let row = [];
      for (let j=0; j<size; j++) {
        row.push(0); // 0 corresponds to an unclaimed spot, 1: player spot, 2: cpu spot
      }
      grid.push(row);
    }
    return grid;
  }

  /*********
  handles the user clicking on an item within the table
  *********/
  selectItem(row, item) {
    this.updateMessage('...');
    if (!this.state.pending) {
      let {grid, turn} = this.state;
      grid[row][item] = 1;
      turn += 1;
      if (!this.state.endGame) {
        if (this.state.gameType==='computer') {
          this.updateMessage("You just moved.");
          this.setState({grid, turn});
          this.cpuTurn(grid);
        } else {
          if (this.state.turn % 2 !== 0) {
            grid[row][item] = 2;
          }
          let endGame = this.checkGameStatus(grid);
          this.setState({endGame, grid, turn});
        }
      }
    }
  }

  /*********
  the default playerNum for player 1: 1
  the default playerNum for player 2 (or CPU): 2
  skips the specified checkNum to find winning spots
  *********/
  arrayWillWin(array, checkNum, playerNum) {
    for (let c=0; c<array.length; c++) {
      if (c!==checkNum) {
        if (array[c]!==playerNum){
          return false;
        }
      }
    }
    return true;
  }

  /*********
  checks if every number in the array is identical to the playerNum
  *********/
  arrayWins(array, playerNum) {
    for (let c=0; c<array.length; c++) {
      if (array[c]!==playerNum) {
        return false;
      }
    }
    return true;
  }

  /*********
  Checks if the given row and item coordinate of the table will win for the specified player
  The player is specified by the playerNum
  *********/
  winSpot(rowNum, itemNum, playerNum, grid) {
    let win = false;
    let row = this.getRow(rowNum, grid);
    win = this.arrayWillWin(row, itemNum, playerNum);
    if (win) {
      return win;
    }
    let col = this.getCol(itemNum, grid);
    win = this.arrayWillWin(col, rowNum, playerNum);
    if (win) {
      return win;
    }
    if (rowNum === itemNum) {
      let diagNeg = this.getDiagNeg(grid);
      win = this.arrayWillWin(diagNeg, rowNum, playerNum);
      if (win) {
        return win;
      }
    }
    let diagPos = this.getDiagPos(grid);
    if (rowNum === grid.length-itemNum-1) {
      win = this.arrayWillWin(diagPos, itemNum, playerNum);
      if (win) {
        return win;
      }
    }
    return win;
  }

  /*********
  Returns a defensive version of the original grid for the CPU
  *********/
  defensiveGrid(grid, timeout) {
    let i = 0;
    let changeItem = {x: null, y: null, itemChanged: false};
    let randomCorners = [];
    let preventWin = false;
    setTimeout(() => {
      while (i<grid.length) {
        let row = grid[i];
        for (let j=0; j<row.length; j++) {
          let item = row[j];
          if (item === 0 ) {
            if (grid[1][1] === 1) {
              // go to a corner if the middle has been taken by player 1
              if ((i===j && grid[i][j] === 0) ||
                  (i === 0 && j === grid.length-1) ||
                  (i === grid.length-1 && j===0)) {
                    if (i!==1) {
                      randomCorners.push({x: i, y: j, itemChanged: true});
                    }
              }
            } else {
              if ((i!==j && grid[i][j] !== 0) ||
                  (i !== 0 && j !== grid.length-1) ||
                  (i !== grid.length-1 && j!==0)) {
                    if (i!==1) {
                      changeItem = {x: i, y: j, itemChanged: true};
                    }
              }
            }
            if (this.state.mode === 'impossible') {
              let win = this.winSpot(i, j, 1, grid); // defensive, checking for wins that player 1 would get
              if (win) {
                preventWin = true;
                changeItem = {x: i, y: j, itemChanged: true};
                i=grid.length;
                break;
              }
            }
          }
        }
        if (grid[1][1]===0) {
          changeItem = {x: 1, y: 1, itemChanged: true};
        }
        // pick a randomCorner to make the game more fun
        if (!preventWin && randomCorners.length>0) {
          let randIndex = Math.floor(Math.random() * randomCorners.length);
          changeItem = randomCorners[randIndex];
        }
        i++;
      }
      if (!changeItem.itemChanged) {
        for (let i=0; i<grid.length; i++) {
          for (let j=0; j<grid.length; j++) {
            if (grid[i][j] === 0) {
              changeItem = {x: i, y: j, itemChanged: true};
            }
          }
        }
      }
      if (changeItem.x !== null && changeItem.y !== null) {
        grid[changeItem.x][changeItem.y] = 2;
      }
    }, timeout);

    return grid;
  }

  /*********
  Returns a specific row of the table given a row number
  *********/
  getRow(rowNum, grid) {
    return grid[rowNum];
  }

  /*********
  Returns a column the table given a column number
  *********/
  getCol(itemNum, grid) {
    let col = [];
    for (let i=0; i<grid.length; i++) {
      col.push(grid[i][itemNum]);
    }
    return col;
  }

  /*********
  Returns a the negative diagonal of the table.
  *********/
  getDiagNeg(grid) {
    let diagNeg = [];
    for (let j=0; j<grid.length; j++) {
      diagNeg.push(grid[j][j]);
    }
    return diagNeg;
  }

  /*********
  Returns a the positive diagonal of the table.
  *********/
  getDiagPos(grid) {
    let diagPos = [];
    for (let c=grid.length-1; c>=0; c--) {
      diagPos.push(grid[c][grid.length-c-1]);
    }
    return diagPos;
  }

  /*********
  Highlights a row of the game board in a win condition
  *********/
  highlightRow(rowNum, grid) {
    let new_grid = grid;
    new_grid[rowNum] = this.sumArrays(grid[rowNum], [3, 3, 3]);
    this.setState({grid: new_grid});
  }

  /*********
  Highlights a column of the game board in a win condition
  *********/
  highlightCol(colNum, grid) {
    let new_grid = grid;
    for (let i=0; i<new_grid.length; i++) {
      new_grid[i][colNum] = new_grid[i][colNum] + 3;
    }
    this.setState({grid: new_grid});
  }

  /*********
  Highlights the negative diagonal of the game board in a win condition
  *********/
  highlightDiagNeg() {
    let new_grid = this.state.grid;
    for (let j=0; j<new_grid.length; j++) {
      new_grid[j][j] = new_grid[j][j] + 3;
    }
    this.setState({grid: new_grid});
  }

  /*********
  Highlights the positive diagonal of the game board in a win condition
  *********/
  highlightDiagPos() {
    let new_grid = this.state.grid;
    for (let c=new_grid.length-1; c>=0; c--) {
      new_grid[c][new_grid.length-c-1] = new_grid[c][new_grid.length-c-1] + 3;
    }
    this.setState({grid: new_grid});
  }

  /*********
  Helper method for easy array addition
  *********/
  sumArrays(array1, array2) {
    let new_array = [];
    for (let i=0; i<array1.length; i++) {
      new_array.push(array1[i]+array2[i]);
    }
    return new_array;
  }

  /*********
  Checks if the player by playerNum has won
  *********/
  winner(playerNum, grid) {
    // check each row for playerNum and check each col for playerNum
    for (let r=0; r<grid.length; r++) {
      let row = this.getRow(r, grid);
      if (this.arrayWins(row, playerNum)) {
        this.highlightRow(r, grid);
        return true;
      }
      let col = this.getCol(r, grid);
      if (this.arrayWins(col, playerNum)) {
        this.highlightCol(r, grid);
        return true;
      }
    }
    let diagNeg = this.getDiagNeg(grid);
    if (this.arrayWins(diagNeg, playerNum)) {
      this.highlightDiagNeg();
      return true;
    }
    let diagPos = this.getDiagPos(grid);
    // check the diagNeg for playerNum and check the diagPos for playerNum
    if (this.arrayWins(diagPos, playerNum)) {
      this.highlightDiagPos();
      return true;
    }
    return false;
  }

  /*********
  Checks if there is a draw
  *********/
  draw(grid) {
    for (let i=0; i<grid.length; i++) {
      for (let j=0; j<grid.length; j++) {
        if (grid[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  /*********
  Makes a cpu move based on a random number from 2-5.
  *********/
  cpuTurn(grid) {
    let timeout = this.pickRandomInRange(2, 5);
    timeout = 2000;
    this.updateGame(grid, timeout);
  }

  /*********
  Checks if anyone has won in the game.
  *********/
  checkGameStatus(grid) {
    let endGame = false;
    if (this.winner(1, grid)) {
      endGame = true;
      if (this.state.gameType === 'computer') {
        this.setState({wins: this.state.wins+1});
      }
      this.setState({message: 'Player 1 wins!'});
    }
    else if (this.winner(2, grid)) {
      endGame = true;
      if (this.state.gameType === 'computer') {
        this.setState({losses: this.state.losses+1});
      }
      this.setState({message: 'Player 2 wins!'});
    }
    else if (this.draw(grid)) {
      endGame = true;
      if (this.state.gameType === 'computer') {
        this.setState({ties: this.state.ties+1});
      }
      this.setState({message: "It's a draw!"})
    }
    return endGame;
  }

  /*********
  Performs a move for the opponent: cpu.
  *********/
  opponentMoves(grid, timeout) {
    if (!this.checkGameStatus(grid)) {
      this.setState({message: "Your opponent is thinking...", pending: true});
      setTimeout(() => {
        this.checkGameStatus(grid) ?
        this.doNothing() :
        this.setState({grid, message: "Your opponent just moved. Your turn!", pending: false})
      }, timeout);
    } else {
      this.checkGameStatus(grid);
    }
  }

  /*********
  Updates the game allowing for message updates in time based on the timeout.
  *********/
  updateGame(grid, timeout) {
    let endGame = this.checkGameStatus(grid);
    if (!endGame) {
      // make the grid offensive by default
      let size = grid.length;
      let win = false;
      if (this.state.mode === 'impossible') {
        for (let i=0; i<size; i++) {
          for (let j=0; j<size; j++) {
            if (grid[i][j]===0) {
              if (this.winSpot(i, j, 2, grid)) {
                win = true;
                grid[i][j] = 2;
              }
            }
          }
        }
      }
      // if the cpu can't win, it plays defense
      if (!win && !this.state.endGame) {
        grid = this.defensiveGrid(grid);
      }
      this.opponentMoves(grid, timeout);
    }
    endGame = this.checkGameStatus(grid);
    this.setState({endGame});
  }

  /*********
  Helper method to pick a random number from 0-max.
  *********/
  pickRandom(max) {
    return Math.floor(Math.random()*max);
  }

  /*********
  Picks a random number from the minimum to the maximum.
  *********/
  pickRandomInRange(min, max) {
    return this.pickRandom(max-min) + min;
  }

  /*********
  Restarts the game based on the state conditions.
  *********/
  restart() {
    let grid = this.createTable(this.state.tableSize);
    this.setState({grid, settings: false});
    if (this.state.player === 2) {
      grid[this.pickRandom(grid.length)][this.pickRandom(grid.length)] = 2;
      setTimeout(()=> this.opponentMoves(grid), this.pickRandomInRange(1, 3));
    } else {
      if (!this.state.gameType === 'player') {
        setTimeout(() => this.setState({message: 'A new game begins. Your move.'}), 2000);
      } else {
        this.updateMessage('...');
      }
    }
    this.setState({endGame: false});
  }

  /*********
  Toggles the game type between 'computer' and 'player'.
  *********/
  toggleGameType(gameType) {
    this.setState({gameType, player: 1});
  }

  /*********
  Toggles the mode between 'easy' and 'impossible'.
  *********/
  toggleMode(mode) {
    this.setState({mode});
  }

  /*********
  Toggles the player between '1' and '2'.
  *********/
  togglePlayer(player) {
    this.setState({player});
  }

  /*********
  Toggles the settings between true and false.
  *********/
  toggleSettings() {
    this.setState({settings: !this.state.settings})
  }

  /*********
  Updates the global message
  *********/
  updateMessage(message) {
    this.setState({message});
  }

  /*********
  A pass function
  *********/
  doNothing() {
    console.log('pick a different spot');
  }

  /*********
  Checks if the item is unoccupied
  *********/
  clickableItem(rowNum, colNum) {
    return this.state.grid[rowNum][colNum] === 0 && this.state.endGame === false;
  }

  /*********
  Checks if the item is highlighted
  *********/
  highlightItem(rowNum, colNum) {
    return this.state.grid[rowNum][colNum] !== 3;
  }

  /*********
  Renders a specific item checking for highlighted items in a win
  *********/
  renderItem(item) {
    switch(item) {
      case 0:
        return (<div className="game-item"> - </div>);
      case 1:
        return (<div className="game-item item-x">x</div>);
      case 2:
        return (<div className="game-item item-o">o</div>);
      case 4:
        return (<div className="game-item item-x highlighted blue-green">x</div>);
      case 5:
        return (<div className="game-item item-o highlighted red-green">o</div>);
      default:
        return (<div className="game-item"> - </div>);
    }
  }

  /*********
  Renders a row and number on the table
  *********/
  renderRow(row, rowNum) {
    return (
      row.map((item, index) => {
        return (
          <td
            key={index}
            className={ this.clickableItem(rowNum, index) ? "item-clickable" : "item"}
            onClick={
              this.clickableItem(rowNum, index) ?
              () => this.selectItem(rowNum, index) :
              () => this.doNothing()}>
            {this.renderItem(item)}
          </td>
        )
      })
    )
  }

  /*********
  Renders the entire table
  *********/
  renderTable(grid) {
    return (
      grid.map((row, index) => {
        return (
          <tr key={index}>
            {this.renderRow(row, index)}
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <center className="TicTacToe">
        {/*<Link to={'/'}>Home</Link>*/}
        <br/>
        <div className="title">
          Tic Tac Toe
        </div>
        <table className="game">
          <tbody>
            {this.renderTable(this.state.grid)}
          </tbody>
        </table>
        <br/>
        <div className="message">
          {this.state.message}
        </div>
        <div className="line"></div>
        <div className="totals">
          <div className="side">
            Wins: {this.state.wins}
          </div>
          <div className="side">
            Ties: {this.state.ties}
          </div>
          <div className="side">
            Losses: {this.state.losses}
          </div>
        </div>
        <div className="line"></div>
        <div>
          <span
            className={this.state.settings ? "button main-button green" : "main-button button"}
            onClick={() => this.toggleSettings()}>
            Settings
          </span>
          <span className="button main-button" onClick={() => this.restart()}>
            Restart
          </span>
        </div>
        {
          this.state.settings ?
          <div className="settings">
            {
              this.state.gameType === 'computer' ?
                <div>
                  <div className="button-pair">
                    <div
                      className={this.state.gameType === 'player' ? 'button green' : 'button'}
                      onClick={() => this.toggleGameType('player')}>
                      Player versus player
                    </div>
                    <div
                      className={this.state.gameType === 'computer' ? 'button green' : 'button'}
                      onClick={() => this.toggleGameType('computer')}>
                      Player versus computer
                    </div>
                  </div>
                  <div className="button-pair">
                    <div
                      className={this.state.mode === 'easy' ? 'button green' : 'button'}
                      onClick={() => this.toggleMode('easy')}>
                      Easy Mode
                    </div>
                    <div
                      className={this.state.mode === 'impossible' ? 'button green' : 'button'}
                      onClick={() => this.toggleMode('impossible')}>
                      Impossible Mode
                    </div>
                  </div>
                  <div className="button-pair">
                    <div
                      className={this.state.player === 1 ? 'button green' : 'button'}
                      onClick={() => this.togglePlayer(1)}>
                      Go First
                    </div>
                    <div
                      className={this.state.player === 2 ? 'button green' : 'button'}
                      onClick={() => this.togglePlayer(2)}>
                      Go Second
                    </div>
                  </div>
                  <br/>
                </div>
              :
              <div>
                <div className="button-pair">
                  <div
                    className={this.state.gameType === 'player' ? 'button green' : 'button'}
                    onClick={() => this.toggleGameType('player')}>
                    Player versus player
                  </div>
                  <div
                    className={this.state.gameType === 'computer' ? 'button green' : 'button'}
                    onClick={() => this.toggleGameType('computer')}>
                    Player versus computer
                  </div>
                </div>
              </div>
            }
          </div>
          :
          <div></div>
        }
      </center>
    )
  }
}

export default TicTacToe;
