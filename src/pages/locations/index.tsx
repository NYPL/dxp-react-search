import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../redux/withRedux";
// Components
import PageContainer from "../../components/shared/layouts/PageContainer";
import SearchHeader from "../../components/shared/SearchHeader";
import Hero from "../../components/location-finder/Hero";
import SearchForm from "../../components/location-finder/SearchForm";
import Locations from "../../components/location-finder/Locations/Locations";
import SearchResultsDetails from "../../components/location-finder/SearchResultsDetails";
import Map from "../../components/location-finder/Map";
import BottomPromo from "../../components/location-finder/BottomPromo";
import Menu from "../../components/ds-prototypes/Menu";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Stack,
  ColorVariants,
  HeadingLevels,
} from "@nypl/design-system-react-components";
// Content + config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { LOCATIONS_BASE_PATH } from "./../../utils/config";
import { railMenuContent } from "./../../__content/menus";

function LocationFinder() {
  return (
    <PageContainer
      metaTags={{
        title: "Location Finder",
        description:
          "The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.",
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
        {
          text: "Locations",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${LOCATIONS_BASE_PATH}`,
        },
      ]}
      breadcrumbsColor={ColorVariants.Locations}
      wrapperClass="nypl--locations"
      contentHeader={
        <>
          <Hero />
          <SearchHeader
            id={"location-finder__title"}
            title={"Find Your Library"}
          >
            <SearchForm />
          </SearchHeader>
        </>
      }
      contentPrimary={
        <Grid templateColumns={[null, null, "repeat(2, 1fr)"]} spacing="l">
          <GridItem
            id="locations-list"
            maxHeight={[null, null, "500px"]}
            overflowY={[null, null, "auto"]}
          >
            <SearchResultsDetails />
            <Locations />
          </GridItem>
          <GridItem id="locations-gmap">
            <Map />
          </GridItem>
        </Grid>
      }
      contentBottom={
        <>
          <BottomPromo />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexFlow: "row nowrap",
              maxWidth: "800px",
            }}
          >
            {railMenuContent.map((menu) => {
              return (
                <Menu
                  id={menu.id}
                  key={menu.id}
                  headingLevel={HeadingLevels.Three}
                  headingColor={"#0576d3"}
                  title={menu.title}
                  // @ts-ignore
                  items={menu.items}
                  menuItemDecoration={false}
                  orientation={"horizontal"}
                />
              );
            })}
          </div>
        </>
      }
    />
  );
}

export default withApollo(withRedux(LocationFinder), {
  ssr: true,
  redirects: false,
});
