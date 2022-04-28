import React from "react";
// Components
import {
  Button,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
import s from "./SearchResultsDetails.module.css";

interface SearchResultsDetailsProps {
  /** The label used in the component's heading. */
  label?: string;
  /** The search results details message. */
  message: string;
  /** The text to display for the clear button. */
  clearMessage: string;
  /** The action to perform on the `<button>`'s onClick function. */
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

function SearchResultsDetails({
  label,
  message,
  clearMessage,
  onClick,
}: SearchResultsDetailsProps) {
  return (
    <div id="search-results__details" role="alert">
      {label && (
        <Heading
          id={"search-results__details-heading"}
          level="two"
          text={label}
        />
      )}
      {message}
      <Button
        className={s.button}
        // @ts-ignore
        buttonType="link"
        // @FIXLATER
        //iconName={null}
        //iconPosition={null}
        id="search-results__details-button"
        mouseDown={false}
        onClick={onClick}
        type="submit"
      >
        {clearMessage}
      </Button>
    </div>
  );
}

export default SearchResultsDetails;
