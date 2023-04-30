import Accordion from "./Accordion";
import styled from "styled-components";

const StyledOptions = styled.form`
  border: 1px solid gray;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  min-width: 20rem;

  label {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.25rem;

    input {
      width: 3rem;
    }

    dd {
      background-color: gray;
    }
  }
`;

const Options = ({ options, setOptions, start }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    start();
  };

  const handleOptionsUpdate = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const optionMenu = [
    {
      title: "Options",
      content: (
        <StyledOptions onSubmit={handleFormSubmit}>
          <label htmlFor="x">
            <span>X:</span>
            <input
              type="number"
              name="x"
              id="x"
              value={options.x}
              onChange={handleOptionsUpdate}
            />
          </label>
          <label htmlFor="y">
            <span>Y:</span>
            <input
              type="number"
              name="y"
              id="y"
              value={options.y}
              onChange={handleOptionsUpdate}
            />
          </label>
          <label htmlFor="speed">
            <span>Speed:</span>
            <input
              type="number"
              name="speed"
              id="speed"
              value={options.speed}
              onChange={handleOptionsUpdate}
            />
          </label>
          <label htmlFor="size">
            <span>Size:</span>
            <input
              type="number"
              name="size"
              id="size"
              value={options.size}
              onChange={handleOptionsUpdate}
            />
          </label>
          <label htmlFor="gap">
            <span>Gap:</span>
            <input
              type="number"
              name="gap"
              id="gap"
              value={options.gap}
              onChange={handleOptionsUpdate}
            />
          </label>
        </StyledOptions>
      ),
    },
  ];

  return (
    <div>
      <Accordion accordionList={optionMenu} />
    </div>
  );
};
export default Options;
