import styled from "styled-components";
import Cell from "./Cell";

const StyledBoard = styled.div`
  background: #575761;
  border: 2px solid ${(props) => (props.gameRunning ? "#37B3C6" : "#EB4027")};
  padding: 1rem;
  margin: 1rem;
  width: ${(props) => props.x * props.size + props.x * props.gap}px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap}px;
  align-self: center;
`;

const Board = ({ board, toggleCell, options, gameRunning }) => {
  return (
    <StyledBoard
      x={options.x}
      size={options.size}
      gap={options.gap}
      gameRunning={gameRunning}
    >
      {board.map((cell, idx) => {
        return (
          <Cell
            alive={cell}
            id={idx}
            size={options.size}
            toggleCell={toggleCell}
            key={idx}
          />
        );
      })}
    </StyledBoard>
  );
};
export default Board;
