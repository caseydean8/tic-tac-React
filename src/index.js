import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props); // Store the game's state in parent component rather than each square, and the parent can tell the each square what to display by passing a prop

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
    console.log(this.state.squares);
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // .slice is used here with the intention of data immutability, which will allow us to backtrack through the history of the game.

    if (calculateWinner(squares) || squares[i]) return; // Ignore a click if somebody has one or if the square has already been clicked.

    squares[i] = this.state.xIsNext ? "X" : "0";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    console.log(squares);
  }

  renderSquare(i) {
    return (
      <Square
        // passing 2 props to Square, value and onClick
        value={this.state.squares[i]} // sent to line 8
        onClick={() => this.handleClick(i)} // sent to line 9
        // in React it's conventional to use on[event] names for props that represent dom events and handle[event] for methods that handle those events
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    winner
      ? (status = `Winner: ${winner}`)
      : (status = `Next player: ${this.state.xIsNext ? "X" : "O"}`);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// =============== GAME =======================================
class Game extends React.Component {
  constructor(props) {
    super(props);
    // history state added to display past moves. This allows removing the squares state from the Board component. This will give Game full control over Board's data, and instruct board to render previous turns from history.
    this.state = { history: [{ squares: Array(9).fill(null) }], xIsNext: true };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
