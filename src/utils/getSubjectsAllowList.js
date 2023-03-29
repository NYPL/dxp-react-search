import sortByName from "./sortByName";
import { SUBJECTS_UUID } from "./setTermsFilter";

function getSubjectsAllowList(divisions) {
  const allowList = [];

  divisions.map((division) => {
    const divisionTerms = division.terms;
    divisionTerms.map((vocab) => {
      if (vocab.uuid === SUBJECTS_UUID) {
        vocab.terms.map((term) => {
          const index = allowList.findIndex((x) => x.uuid == term.uuid);
          if (index === -1) {
            allowList.push(term);
          }
        });
      }
    });
  });

  return allowList.sort(sortByName);
}

export default getSubjectsAllowList;
