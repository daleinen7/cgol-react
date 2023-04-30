import { useState, useEffect, useCallback } from "react";
import GlobalStyle from "./global";
import Board from "./Board";
import Options from "./Options";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: 100vh;
  color: white;
  background: var(--black);
  font-family: "Quicksand", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 0;
    padding: 4rem;
    text-align: center;
    font-size: 2.5rem;
  }

  button {
    padding: 1.25rem 1.75rem;
    border: none;
    font-family: "Quicksand";
    font-size: 1.25rem;
  }

  .start {
    background-color: var(--green);
    width: 20rem;
  }

  .saved-board-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .load {
    background-color: var(--blue);
  }

  .delete {
    background-color: var(--red);
  }
`;

function App() {
  const [board, setBoard] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [options, setOptions] = useState({
    x: 7,
    y: 5,
    speed: 1000,
    size: 16,
    gap: 2,
  });
  const [savedBoardList, setSavedBoardList] = useState(
    JSON.parse(localStorage.getItem("savedBoards"))
  );
  const [gameRunning, setGameRunning] = useState(false);

  const init = useCallback(() => {
    setBoard(new Array(options.x * options.y).fill(false));
    setGameRunning(false);
  }, [options, setGameRunning]);

  const start = () => {
    setGameRunning(true);
  };

  const pause = () => {
    setGameRunning(false);
  };

  const toggleCell = (idx) => {
    const updatedBoard = [...board];
    updatedBoard[idx] = !board[idx];
    setBoard(updatedBoard);
  };

  const randomize = () => {
    setBoard(
      new Array(options.x * options.y).fill().map(() => Math.random() < 0.5)
    );
  };

  const saveBoard = () => {
    let savedBoards = JSON.parse(localStorage.getItem("savedBoards"));
    const currentBoard = { options, board };
    if (savedBoards) {
      localStorage.setItem(
        "savedBoards",
        JSON.stringify([...savedBoards, currentBoard])
      );
    } else {
      localStorage.setItem("savedBoards", JSON.stringify([currentBoard]));
    }
    showSavedBoards();
  };

  const loadBoard = async (idx) => {
    await setOptions(savedBoardList[idx].options);
    setBoard(savedBoardList[idx].board);
  };

  const deleteBoard = (idx) => {
    let currentBoards = [...savedBoardList];
    currentBoards.splice(idx, 1);
    localStorage.setItem("savedBoards", JSON.stringify(currentBoards));
    showSavedBoards();
  };

  const showSavedBoards = () => {
    setSavedBoardList(JSON.parse(localStorage.getItem("savedBoards")));
  };

  // Render
  useEffect(() => {
    const render = () => {
      const x = parseInt(options.x);

      const updatedBoard = board.map((cell, idx) => {
        // get number of neighbors of each cell
        let neighbors = 0;

        // check top neighbor
        if (board[idx - x] === true) {
          // if (idx === 8) console.log("Top");
          neighbors += 1;
        }

        // check bottom neighbor
        if (board[idx + x] === true) {
          // if (idx === 8) console.log("Bottom");
          neighbors += 1;
        }
        // check left neighbor
        if (idx % x !== 0 && board[idx - 1] === true) {
          // if (idx === 8) console.log("Left");
          neighbors += 1;
        }
        // check right neighbor
        if (idx % x !== x - 1 && board[idx + 1] === true) {
          // if (idx === 8) console.log("Right");
          neighbors += 1;
        }

        if (idx % x !== 0) {
          // top left diagonal
          if (board[idx - x - 1] === true) {
            // if (idx === 8) console.log("Top Left Diagonal");
            neighbors += 1;
          }
          // bottom  left diagonal
          if (board[idx + x - 1] === true) {
            // if (idx === 8) console.log("Bottom Left Diagonal");
            neighbors += 1;
          }
        }

        if (idx % x !== x - 1) {
          if (board[idx - x + 1] === true) {
            // top right diagonal
            // if (idx === 8) console.log("Top Right Diagonal");
            neighbors += 1;
          }
          // bottom right diagonal
          if (board[idx + x + 1] === true) {
            // if (idx === 8) console.log("Bottom Right Diagonal");
            neighbors += 1;
          }
        }

        // if (idx === 6) {
        //   console.log("idx");
        // }

        // if (idx === 6) {
        //   console.log(`Cell ${idx} has ${neighbors} neighbors`);
        // }

        // if neighbors are too low set cell to false
        if (neighbors < 2) return false;

        // if neighbors are too high set cell to false
        if (neighbors >= 4) return false;

        // if neighbors are 3 set cell to true (create alive cell)
        if (neighbors === 3) return true;

        return board[idx];
      });

      setBoard(updatedBoard);
    };

    if (gameRunning) {
      const timer = setInterval(() => {
        render();
      }, options.speed);
      return () => clearInterval(timer);
    }
  }, [options, board, setBoard, gameRunning]);

  // Intialize on start or after options change
  useEffect(() => {
    init();
  }, [options, init]);

  useEffect(() => {
    showSavedBoards();
  }, []);

  return (
    <StyledContainer>
      <GlobalStyle />
      <header>
        <h1>Conway's Game of Life</h1>
      </header>
      <button className="start" onClick={gameRunning ? pause : start}>
        {gameRunning ? "Pause" : "Start"}
      </button>
      <Options options={options} setOptions={setOptions} start={start} />
      <Board
        board={board}
        toggleCell={toggleCell}
        options={options}
        gameRunning={gameRunning}
      />
      <button onClick={saveBoard}>Save</button>
      {savedBoardList && (
        <ul className="saved-board-list">
          {savedBoardList.map((board, idx) => {
            return (
              <li className="saved-board" key={idx}>
                <button className={"load"} onClick={() => loadBoard(idx)}>
                  Load {idx}
                </button>
                <button className={"delete"} onClick={() => deleteBoard(idx)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button className="reset" onClick={init}>
        Reset
      </button>
      <button className="randomize" onClick={randomize}>
        Randomize
      </button>
    </StyledContainer>
  );
}

export default App;
