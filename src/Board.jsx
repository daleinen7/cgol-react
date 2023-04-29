import styled from "styled-components";
import Cell from "./Cell";

const StyledBoard = styled.div`
  background: slategray;
  padding: 1rem;
  margin: 1rem;
  width: ${(props) => props.x * props.size + props.x - 1}px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2px;
  align-self: center;
`;

const Board = ({ board, toggleCell, options }) => {
  console.log("Width: ", options.x * options.size + 2);
  return (
    <StyledBoard x={options.x} size={options.size}>
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
