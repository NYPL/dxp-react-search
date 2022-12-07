import React from "react";
// Next
import { useRouter } from "next/router";
import Link from "next/link";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { AUTO_SUGGEST_QUERY } from "./../SearchForm/SearchForm";
import { Heading } from "@nypl/design-system-react-components";
import s from "./AlphabetNav.module.css";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
import getActiveLetters from "./../../../utils/getActiveLetters";

function AlphabetNav({ className, title, description }) {
  const router = useRouter();
  // State for selected letter.
  const selectedLetter = router.query.alpha ? router.query.alpha : null;
  // Build alphabet array.
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((c) => c.toUpperCase());
  // Get the active letters from existing auto suggestion cache.
  const { data: activeLettersData } = useQuery(AUTO_SUGGEST_QUERY, {});
  const activeLetters = getActiveLetters(
    activeLettersData?.allAutoSuggestions,
    "name"
  );

  return (
    <>
      <div className={`${s.AlphabetNav} ${className ? className : ""}`}>
        <Heading id={title} level={2}>
          <>{title}</>
        </Heading>
        <div className={s.description}>{description}</div>
        <div className="letters-wrapper">
          {alphabet.map((letter) => {
            if (activeLetters.includes(letter)) {
              return (
                <Link
                  key={letter}
                  href={`${ONLINE_RESOURCES_BASE_PATH}/search?alpha=${letter}`}
                >
                  <a
                    className={`${s.letters} ${
                      selectedLetter === letter ? s.active : ""
                    }`}
                  >
                    {letter}
                  </a>
                </Link>
              );
            } else {
              return (
                <a
                  key={letter}
                  aria-disabled="true"
                  tabIndex={-1}
                  className={`${s.letters} ${s.inactive}`}
                >
                  {letter}
                </a>
              );
            }
          })}
          <Link
            key={"All"}
            href={`${ONLINE_RESOURCES_BASE_PATH}/search?alpha=all`}
          >
            <a
              className={`${s.letters} ${s.all} ${
                selectedLetter === "all" ? s.active : ""
              }`}
            >
              {"Show All"}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AlphabetNav;
