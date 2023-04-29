import styled from "styled-components";

const StyledCell = styled.div`
  background: ${(props) => (props.alive ? "white" : "gray")};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  box-shadow: ${(props) =>
    props.alive
      ? "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa"
      : "none"};
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
