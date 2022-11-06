import React from "react";
// Next
import { useRouter } from "next/router";
import Link from "next/link";
// Apollo
import { useQuery } from "@apollo/client";
// @TODO move this to a shared query?
import { AutoSuggestQuery as AUTO_SUGGEST_QUERY } from "./../SearchForm/AutoSuggest.gql";
// Components
import { AlphabetFilter } from "@nypl/design-system-react-components";
import { Heading } from "@nypl/design-system-react-components";
import s from "./AlphabetNav.module.css";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
import getActiveLetters from "./../../../utils/getActiveLetters";

function AlphabetNav({ className, title, description }) {
  const router = useRouter();
  // State for selected letter.
  const selectedLetter = router.query.alpha ? router.query.alpha.toLowerCase() : null;
  // Get the active letters from existing auto suggestion cache.
  const { data: activeLettersData } = useQuery(AUTO_SUGGEST_QUERY, {});
  const activeLetters = getActiveLetters(
    activeLettersData?.allAutoSuggestions,
    "name"
  );
  const filteredActiveLetters = activeLetters.filter(x => isNaN(x)).map(letter => letter.toLowerCase());

  function alphaLink(link) {
    if (link === "showAll") {
      window.location = `${ONLINE_RESOURCES_BASE_PATH}/search?alpha=all`;
    } else {
      window.location = `${ONLINE_RESOURCES_BASE_PATH}/search?alpha=${link.toUpperCase()}`;
    }
  }

  return (
    <>
      <AlphabetFilter
        activeLetters={filteredActiveLetters}
        className={`${s.AlphabetNav} ${className ? className : ""}`}
        currentLetter={selectedLetter}
        descriptionText={description}
        headingText={title}
        id="alphabet-filter-id"
        onClick={(e) => alphaLink(e)}
      />
    </>
  );
}

export default AlphabetNav;
