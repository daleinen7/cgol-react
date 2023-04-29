import { useEffect, useState } from "react";
import GlobalStyle from "./global";
import Board from "./Board";
import Options from "./Options";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: 100vh;
  color: white;
  background: black;
  font-family: "Quicksand", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 0;
    padding: 4rem;
    text-align: center;
  }

  button {
    padding: 1.25rem 1.75rem;
    margin: 2rem;
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
    x: 3,
    y: 3,
    speed: 100,
    size: 16,
  });

  const init = () => {
    setBoard(new Array(options.x * options.y).fill(false));
  };

  const start = () => {
    init();
  };

  const toggleCell = (idx) => {
    const updatedBoard = [...board];
    updatedBoard[idx] = !board[idx];
    setBoard(updatedBoard);
  };

  return (
    <StyledContainer>
      <GlobalStyle />
      <header>
        <h1>Conway's Game of Life</h1>
      </header>
      <button onClick={start}>Start</button>
      <Options options={options} setOptions={setOptions} start={start} />
      <Board board={board} toggleCell={toggleCell} options={options} />
      <button onClick={init}>Reset</button>
    </StyledContainer>
  );
}

export default App;
