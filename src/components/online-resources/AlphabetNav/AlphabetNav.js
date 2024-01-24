import React from "react";
// Next
import { useRouter } from "next/router";
import Link from "next/link";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { AUTO_SUGGEST_QUERY } from "./../SearchForm/SearchForm";
// Components
import { AlphabetFilter, Box } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
import getActiveLetters from "./../../../utils/getActiveLetters";

function AlphabetNav({ className, title, description }) {
  const router = useRouter();
  // State for selected letter.
  const selectedLetter = router.query.alpha
    ? router.query.alpha.toLowerCase()
    : null;
  // Get the active letters from existing auto suggestion cache.
  const { data: activeLettersData } = useQuery(AUTO_SUGGEST_QUERY, {});
  const activeLetters = getActiveLetters(
    activeLettersData?.allAutoSuggestions,
    "name"
  );
  const filteredActiveLetters = activeLetters
    .filter((x) => isNaN(x))
    .map((letter) => letter.toLowerCase());

  const handleClick = (link) => {
    if (link === "showAll") {
      router.push(`${ONLINE_RESOURCES_BASE_PATH}/search?alpha=all`);
    } else {
      router.push(
        `${ONLINE_RESOURCES_BASE_PATH}/search?alpha=${link.toUpperCase()}`
      );
    }
  };

  return (
    <>
      <Box mb="l">
        <AlphabetFilter
          activeLetters={filteredActiveLetters}
          className={`${className ? className : ""}`}
          currentLetter={selectedLetter}
          descriptionText={description}
          headingText={<Heading level="h2">{title}</Heading>}
          id="alphabet-filter-id"
          onClick={(e) => handleClick(e)}
        />
      </Box>
    </>
  );
}

export default AlphabetNav;
