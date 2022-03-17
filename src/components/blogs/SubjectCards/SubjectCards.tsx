import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { TERM_BASE_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/term";
// Components
import { Grid } from "@nypl/design-system-react-components";
import Card from "../../shared/Card";
import CardSet from "../../shared/Card/CardSet";
// Utils
import { BLOGS_BASE_PATH } from "./../../../utils/config";

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
    $sort: Sort
    $limit: Int
    $filter: TermQueryFilter
  ) {
    allTermsByVocab(
      vocabulary: $vocabulary
      sort: $sort
      limit: $limit
      filter: $filter
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
      limit: 6,
      filter: {
        featured: {
          fieldName: "field_bs_featured",
          operator: "=",
          value: true,
        },
        limiter: {
          fieldName: "field_lts_content_type",
          operator: "=",
          value: "blog",
        },
      },
      sort: {
        field: "name",
        direction: "ASC",
      },
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
      <Grid
        as="ul"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1.25rem"
        listStyleType="none"
      >
        {data.allTermsByVocab.map((item: SubjectCardItem) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              url={`${BLOGS_BASE_PATH}/all?subject=${item.tid}`}
            />
          </li>
        ))}
      </Grid>
    </CardSet>
  );
}

export default SubjectCards;
