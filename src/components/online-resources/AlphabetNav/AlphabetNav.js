import React from "react";
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { useQuery } from '@apollo/client';
// @TODO move this to a shared query?
import { AutoSuggestQuery as AUTO_SUGGEST_QUERY } from './../SearchForm/AutoSuggest.gql';
// Components
import { 
  Heading 
} from '@nypl/design-system-react-components';
import s from './AlphabetNav.module.css';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../utils/config';
import getActiveLetters from './../../../utils/getActiveLetters';

function AlphabetNav({ title, description }) {
  const router = useRouter();
  // State for selected letter.
  const selectedLetter = router.query.alpha ? router.query.alpha : null;
  // Build alphabet array.
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => c.toUpperCase());
  // Get the active letters from existing auto suggestion cache.
  const { data: activeLettersData } = useQuery(AUTO_SUGGEST_QUERY, {});
  const activeLetters = getActiveLetters(activeLettersData?.allAutoSuggestions);

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
              <Link href={`${ONLINE_RESOURCES_BASE_PATH}/search?alpha=${letter}`}>
                <a>
                  <button key={letter} className={buttonClasses}>
                    {letter}
                  </button>
                </a>
              </Link>
            );
          })}
          <Link href={`${ONLINE_RESOURCES_BASE_PATH}/search?alpha=all`}>
            <a>
              <button 
                key={"All"} 
                className={`${s.all} ${selectedLetter === 'all'  ? s.active : ''}`}
              >
                {"Show All"}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AlphabetNav;