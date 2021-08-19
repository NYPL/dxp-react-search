import React from "react";
// Apollo
//import { useQuery } from "@apollo/client";
//import { FeaturedPostsQuery as FEATURED_POSTS_QUERY } from "../FeaturedPosts/FeaturedPosts.gql";
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
  CardImage,
  CardImageRatios,
  CardImageSizes,
  CardLayouts,
  Heading,
  List,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardGridSkeleton from "../../ds-prototypes/CardGrid/CardGridSkeleton";
//import Card from "../../shared/Card";
import Image from "../../shared/Image";
// Next components
import Link from "next/link";

const FEATURED_POSTS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query FeaturedPostsQuery($vocabulary: String) {
    allTermsByVocab(vocabulary: $vocabulary) {
      ...TermBaseFields
      ...ImageFields
      url
    }
  }
`;

function FeaturedPosts() {
  // Query for data.
  const { loading, error, data } = useQuery(FEATURED_POSTS_QUERY, {
    variables: {
      vocabulary: "channel",
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading channels.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div className="card-grid">
        <List
          className="card-grid__list"
          modifiers={["no-list-styling"]}
          type="ul"
        >
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
        </List>
      </div>
    );
  }

  console.log(data);

  const featuredPosts = data.allTermsByVocab;

  return (
    <div>
      <Heading id="test-23232323" level={2} text={"Featured Posts"} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur.
      </p>
      <div
        style={{
          display: "grid",
          "grid-gap": "3rem",
          "grid-template-columns": "repeat(1, 1fr)",
        }}
      >
        <List
          className="card-grid__list"
          modifiers={["no-list-styling"]}
          type="ul"
        >
          {featuredPosts.map((item) => {
            return (
              <li key={item.id} className="card-grid__list-item">
                <Card layout={CardLayouts.Horizontal} center>
                  <CardImage
                    component={
                      <Image
                        id={item.image.id}
                        alt={item.image.alt}
                        uri={item.image.uri}
                        useTransformation={true}
                        transformations={item.image.transformations}
                        transformationLabel={"2_1_960"}
                        layout="responsive"
                        width={900}
                        height={450}
                        quality={90}
                      />
                    }
                    imageAspectRatio={CardImageRatios.TwoByOne}
                    imageSize={CardImageSizes.Large}
                  />
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
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default FeaturedPosts;
