import styled from "styled-components";

const StyledCell = styled.div`
  background: ${(props) => (props.alive ? "purple" : "white")};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  color: magenta;
`;

const Cell = ({ alive, id, size, toggleCell }) => {
  const handleCellClick = () => {
    toggleCell(id);
  };
  return (
    <StyledCell
      size={size}
      alive={alive}
      onClick={handleCellClick}
    ></StyledCell>
  );
};
export default Cell;
