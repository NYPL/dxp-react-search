import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { TERM_BASE_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/term";
// Components
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";
import CardSet from "../../shared/Card/CardSet";

interface SubjectCardItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  tid: string;
}

const SUBJECTS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  query ChannelsQuery(
    $vocabulary: String
    $sortBy: String
    $limit: Int
    $featured: Boolean
    $limiter: String
  ) {
    allTermsByVocab(
      vocabulary: $vocabulary
      sortBy: $sortBy
      limit: $limit
      featured: $featured
      limiter: $limiter
    ) {
      ...TermBaseFields
    }
  }
`;

function SubjectCards() {
  // Query for data.
  const { loading, error, data } = useQuery(SUBJECTS_QUERY, {
    variables: {
      vocabulary: "subject",
      limiter: "blog",
      featured: true,
      limit: 6,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading subjects.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <CardSet
      id="explore-by-subject"
      title="Explore by Subject"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur."
    >
      <CardGrid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1.25rem"
      >
        {data.allTermsByVocab.map((item: SubjectCardItem) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              url={`/blogs/all?subject=${item.tid}`}
            />
          </li>
        ))}
      </CardGrid>
    </CardSet>
  );
}

export default SubjectCards;
