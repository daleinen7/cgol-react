import React, { useState } from "react";
import rightArrow from "./images/right-arrow.svg";
import styled from "styled-components";

const StyledAccordion = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  dt {
    background: var(--gray);
    display: flex;
    justify-content: space-around;
    padding: 1.25rem;
    cursor: pointer;
  }

  dt[aria-expanded="true"] img {
    transform: rotateZ(90deg);
  }

  .list-group {
    display: flex;
    flex-direction: column;
    border-top: 1px solid black;
    padding: 1.5rem 0 0 0;
  }

  img {
    transition: all 0.35s ease;
  }

  dd {
    overflow: hidden;
    max-height: 50rem;
    transition: max-height 1.5s ease-in-out;
    background-color: gray;
  }

  dd[aria-expanded="true"] {
    max-height: 0px;
    transition: max-height 1s cubic-bezier(0, 1, 0, 1);
  }
`;

const Accordion = ({ accordionList }) => {
  const [open, setOpen] = useState(accordionList.map((accordion) => false));
  const [focused, setFocused] = useState(
    accordionList.map((accordion) => false)
  );

  const toggleAccordion = (idx) => {
    setOpen({ ...open, [idx]: !open[idx] });
  };

  const handleKeyboardListener = (e, idx) => {
    if (e.key === " " && focused[idx]) {
      e.preventDefault();
      let newOpen = open;
      newOpen[idx] = !open[idx];
      setOpen(newOpen);
    }
  };

  const handleFocus = (e, idx) => {
    let newFocused = focused;
    newFocused[idx] = !focused[idx];
    setFocused(newFocused);
  };

  return (
    <StyledAccordion>
      {accordionList.map((acc, idx) => (
        <React.Fragment key={idx}>
          <div className="list-group">
            <dt
              onClick={() => toggleAccordion(idx)}
              onKeyDown={(e) => handleKeyboardListener(e, idx)}
              onFocus={(e) => handleFocus(e, idx)}
              onBlur={(e) => handleFocus(e, idx)}
              aria-expanded={open[idx]}
              tabIndex={"0"}
              role="button"
            >
              {acc.title}
              <img src={rightArrow} alt="collapse accordion" />
            </dt>
            <dd aria-expanded={!open[idx]}>{acc.content}</dd>
          </div>
        </React.Fragment>
      ))}
    </StyledAccordion>
  );
};
export default Accordion;
