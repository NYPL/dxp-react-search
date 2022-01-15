import React from "react";
// Apollo
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import {
  Card,
  CardContent,
  CardHeading,
  //CardImage,
  ImageRatios,
  ImageSizes,
  CardLayouts,
  Heading,
  List,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import Image from "../../shared/Image";
// Next components
import Link from "next/link";

const BOOK_LIST_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query BookListQuery($vocabulary: String) {
    allTermsByVocab(vocabulary: $vocabulary) {
      ...TermBaseFields
      ...ImageFields
      url
    }
  }
`;

function BookList() {
  // Query for data.
  const { loading, error, data } = useQuery(BOOK_LIST_QUERY, {
    variables: {
      vocabulary: "channel",
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading book list.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  const bookListItems = data.allTermsByVocab;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading id="book-list" level={2} text="Book List" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur.
      </p>
      <CardGrid gap="2rem" templateColumns="repeat(1, 1fr)">
        {bookListItems.map((item) => (
          <li key={item.id}>
            <Card
              layout={CardLayouts.Horizontal}
              center
              imageComponent={
                <Image
                  id={item.image.id}
                  alt={item.image.alt}
                  uri={item.image.uri}
                  useTransformation={true}
                  transformations={item.image.transformations}
                  transformationLabel={"1_1_960"}
                  layout="responsive"
                  width={960}
                  height={960}
                  quality={90}
                />
              }
              imageAspectRatio={ImageRatios.Sqaure}
              imageSize={ImageSizes.Small}
            >
              <CardHeading level={3}>
                {item.url && (
                  <Link href={item.url}>
                    <a>{item.name}</a>
                  </Link>
                )}
              </CardHeading>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                ></div>
              </CardContent>
            </Card>
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

export default BookList;

/*

*/
