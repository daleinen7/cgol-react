import styled from "styled-components";

const StyledOptions = styled.form`
  border: 1px solid gray;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    justify-content: space-between;
    width: 30%;
    margin: 0.375rem;
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

  return (
    <StyledOptions onSubmit={handleFormSubmit}>
      <label htmlFor="x">
        X:
        <input
          type="number"
          name="x"
          id="x"
          value={options.x}
          onChange={handleOptionsUpdate}
        />
      </label>
      <label htmlFor="y">
        Y:
        <input
          type="number"
          name="y"
          id="y"
          value={options.y}
          onChange={handleOptionsUpdate}
        />
      </label>
      <label htmlFor="speed">
        Speed:
        <input
          type="number"
          name="speed"
          id="speed"
          value={options.speed}
          onChange={handleOptionsUpdate}
        />
      </label>
      <label htmlFor="size">
        Size:{" "}
        <input
          type="number"
          name="size"
          id="size"
          value={options.size}
          onChange={handleOptionsUpdate}
        />
      </label>
    </StyledOptions>
  );
};
export default Options;