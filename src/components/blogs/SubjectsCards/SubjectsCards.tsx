import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import { Heading } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";
import { CardType as CardItem } from "./../../shared/Card/CardTypes";

const SUBJECTS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  query ChannelsQuery($vocabulary: String, $sortBy: String, $limit: Int) {
    allTermsByVocab(vocabulary: $vocabulary, sortBy: $sortBy, limit: $limit) {
      ...TermBaseFields
    }
  }
`;

function SubjectsCards() {
  // Query for data.
  const { loading, error, data } = useQuery(SUBJECTS_QUERY, {
    variables: {
      vocabulary: "subject",
      sortBy: "weight",
      limit: 6,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading subjects.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading id="explore-by-subject" level={2} text="Explore by Subject" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur.
      </p>
      <CardGrid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1.25rem"
      >
        {data.allTermsByVocab.map((item: any) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              url={`/someting-something?id=${item.tid}`}
            />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

export default SubjectsCards;
