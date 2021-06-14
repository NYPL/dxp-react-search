import React, { useState, useEffect } from "react";

import { 
  Heading 
} from '@nypl/design-system-react-components';
import s from './AlphabetNav.module.css' 

const AlphabetNav = ({
  title,
  description,
  activeLetters,
  onPageChange
}) => {
  // State for selected letter
  const [selectedLetter, setSelectedLetter] = useState("");

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => c.toUpperCase());

  useEffect(() => {
    if (
      typeof onPageChange !== "undefined" &&
      typeof onPageChange === "function"
    ) {
      onPageChange(selectedLetter);
    }
  }, [selectedLetter]);
  
  return (
    <>
    <div className={"AlphabetNav"}>
      <Heading id={title} level={2}>
        <>
        {title}
        </>
      </Heading>
      <div className={s.description}>{description}</div>
      <div className={s.letters}>
        {alphabet.map((letter) => {
          const inactiveClass = activeLetters.includes(letter) ? '' : s.inactive;
          const activeClass = (selectedLetter === letter)  ? s.active : '';
          const buttonClasses = inactiveClass + activeClass;
          return (
            <button
              key={letter}
              className={buttonClasses}
              onClick={activeLetters.includes(letter) ? () => setSelectedLetter(letter) : null}
            >
              {letter}
            </button>
          );
        })}
        <button
          key={"All"}
          className={s.all}
          onClick={() => setSelectedLetter()}
        >
          {"Show All"}
        </button>
      </div>
    </div>
    </>
  );
};

export default AlphabetNav;
