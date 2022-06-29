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
import LocationsMap from "../../components/location-finder/LocationsMap";
import BottomPromo from "../../components/location-finder/BottomPromo";
import Menu from "../../components/ds-prototypes/Menu";
import { Box, Grid, GridItem } from "@nypl/design-system-react-components";
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
      breadcrumbsColor="locations"
      wrapperClass="nypl--locations"
      contentHeader={
        <>
          <Hero />
          <SearchHeader
            headingId={"location-finder__title"}
            title={"Find Your Library"}
          >
            <SearchForm />
          </SearchHeader>
        </>
      }
      contentPrimary={
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }}>
          <GridItem
            id="locations-list"
            maxHeight={{ md: "500px" }}
            overflowY={{ md: "auto" }}
          >
            <SearchResultsDetails />
            <Locations />
          </GridItem>
          <GridItem id="locations-gmap">
            <LocationsMap />
          </GridItem>
        </Grid>
      }
      contentBottom={
        <>
          <BottomPromo />
          <Box
            display={{ md: "flex" }}
            justifyContent={{ md: "space-between" }}
            flexFlow={{ md: "row nowrap" }}
            maxWidth={{ md: "800px" }}
            mb="l"
          >
            {railMenuContent.map((menu) => {
              return (
                <Menu
                  id={menu.id}
                  key={menu.id}
                  headingLevel="three"
                  headingColor={"#0576d3"}
                  title={menu.title}
                  // @ts-ignore
                  items={menu.items}
                  menuItemDecoration={false}
                  orientation={"horizontal"}
                />
              );
            })}
          </Box>
        </>
      }
    />
  );
}

export default withApollo(withRedux(LocationFinder), {
  ssr: true,
  redirects: false,
});
