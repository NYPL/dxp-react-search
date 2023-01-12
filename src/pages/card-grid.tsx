import * as React from "react";
import PageContainer from "../components/shared/layouts/PageContainer";
import CardGrid from "../components/shared/CardGrid";
import { Box, Heading } from "@nypl/design-system-react-components";

function getMockImage(id: string) {
  const image = {
    id: `test-id-${id}`,
    alt: `image-${id}-alt-text`,
    layout: "responsive",
    width: 400,
    height: 200,
    quality: 90,
    uri: "https://placeimg.com/400/200/arch",
    useTransformation: false,
    transformationLabel: "2_1_960",
  };

  return image;
}

const cardGridItems = [
  {
    id: "item-1",
    title: "Item 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("one"),
  },
  {
    id: "item-2",
    title: "Item 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("two"),
  },
  {
    id: "item-3",
    title: "Item 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("three"),
  },
  {
    id: "item-4",
    title: "Item 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("four"),
  },
  {
    id: "item-5",
    title: "Item 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("five"),
  },
  {
    id: "item-6",
    title: "Item 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://google.com",
    image: getMockImage("six"),
  },
];

export default function CardGridPage() {
  return (
    <PageContainer
      breadcrumbs={[
        {
          text: "Card Grid Examples",
          url: "https://nypl.org",
        },
      ]}
      wrapperClass="nypl--card-grid-example"
      contentPrimary={
        <>
          <Box mb="xl">
            <Heading level="one">Setting: "Row"</Heading>
            <p>This layout is the same regardless of the number of cards.</p>
            <CardGrid
              id="card-setting-row"
              type="card-setting-row"
              title="Row: 6 cards"
              layout="row"
              items={cardGridItems}
            />
          </Box>

          <Box mb="xl">
            <Heading level="one">Setting: "Column"</Heading>
            <CardGrid
              id="card-setting-column-6"
              type="card-setting-column"
              title="Column: 6 cards"
              layout="column"
              items={cardGridItems}
            />

            <CardGrid
              id="card-setting-column-5"
              type="card-setting-column"
              title="Column: 5 cards"
              layout="column"
              items={cardGridItems.slice(0, 5)}
            />

            <CardGrid
              id="card-setting-column-4"
              type="card-setting-column"
              title="Column: 4 cards"
              layout="column"
              items={cardGridItems.slice(0, 4)}
            />

            <CardGrid
              id="card-setting-column-3"
              type="card-setting-column"
              title="Column: 3 cards"
              layout="column"
              items={cardGridItems.slice(0, 3)}
            />

            <CardGrid
              id="card-setting-column-2"
              type="card-setting-column"
              title="Column: 2 cards"
              layout="column"
              items={cardGridItems.slice(0, 2)}
            />

            <CardGrid
              id="card-setting-column-1"
              type="card-setting-column"
              title="Column: 1 card (Not Recommended)"
              layout="column"
              items={cardGridItems.slice(0, 1)}
            />
          </Box>

          <Box mb="xl">
            <Heading level="one">Setting: "Column - Two Featured"</Heading>
            <CardGrid
              id="card-setting-column2featured_6"
              type="card-setting-column2featured_6"
              title="Column - Two Featured: 6 cards (2 4)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 6)}
            />
            <CardGrid
              id="card-setting-column2featured_5"
              type="card-setting-column2featured_5"
              title="Column - Two Featured: 5 cards (2 3)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 5)}
            />
            <CardGrid
              id="card-setting-column2featured_4"
              type="card-setting-column2featured_4"
              title="Column - Two Featured: 4 cards (2 2)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 4)}
            />
            <CardGrid
              id="card-setting-column2featured_3"
              type="card-setting-column2featured_3"
              title="Column - Two Featured: 3 cards (Not Recommended)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 3)}
            />
            <CardGrid
              id="card-setting-column2featured_2"
              type="card-setting-column2featured_2"
              title="Column - Two Featured: 2 cards (Not Recommended)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 2)}
            />
            <CardGrid
              id="card-setting-column2featured_1"
              type="card-setting-column2featured_1"
              title="Column - Two Featured: 1 card (Not Recommended)"
              layout="column_two_featured"
              items={cardGridItems.slice(0, 1)}
            />
          </Box>

          <Box mb="xl">
            <Heading level="one">Alternative Layouts</Heading>
            <p>
              These are combinations of 2 Card Grids that present a unified
              layout. The 2nd card grid doesn't have a heading/title.
            </p>
            <CardGrid
              id="card-setting-alt-1"
              type="card-setting-alt-1"
              title="Row: 1 card + Column - 4: 4 cards"
              layout="row"
              items={cardGridItems.slice(0, 1)}
            />
            <CardGrid
              id="card-setting-alt-1"
              type="card-setting-alt-1"
              layout="column"
              items={cardGridItems.slice(0, 4)}
            />

            <CardGrid
              id="card-setting-alt-2"
              type="card-setting-alt-2"
              title="Row: 1 card + Column: 3 cards"
              layout="row"
              items={cardGridItems.slice(0, 1)}
            />
            <CardGrid
              id="card-setting-alt-2"
              type="card-setting-alt-2"
              layout="column"
              items={cardGridItems.slice(0, 3)}
            />
          </Box>
        </>
      }
    />
  );
}