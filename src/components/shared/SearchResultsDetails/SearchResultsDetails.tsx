import React from "react";
// Components
import { Button, Heading } from "@nypl/design-system-react-components";
import s from "./SearchResultsDetails.module.css";

interface SearchResultsDetailsProps {
  /** */
  label: string;
  /** */
  message: string;
  /** */
  clearMessage: string;
  /** */
  onClick: any;
}

function SearchResultsDetails({
  label,
  message,
  clearMessage,
  onClick,
}: SearchResultsDetailsProps) {
  return (
    <div id="search-results__details" role="alert">
      <Heading id={"search-results__details-heading"} level={2} text={label} />
      {message}
      <Button
        className={s.button}
        // @ts-ignore
        buttonType="link"
        iconName={null}
        iconPosition={null}
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
