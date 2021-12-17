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
import { ColorVariants } from "@nypl/design-system-react-components";
//
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import BottomMenuContent from "../../components/shared/BottomMenus/content";

function LocationFinder() {
  return (
    <PageContainer
      metaTags={{
        title: "Location Finder",
        description:
          "The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.",
        url: "https://www.nypl.org/locations",
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
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
        <div className="locations">
          <div className="locations__list" id="locations-list">
            <SearchResultsDetails />
            <Locations />
          </div>
          <div id="locations-gmap" className="locations__map">
            <div className="locations__map-help-msg">
              Use two fingers to pan the map.
            </div>
            <Map />
          </div>
        </div>
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
            {BottomMenuContent.map((menu) => {
              return (
                <Menu
                  id={menu.id}
                  key={menu.id}
                  headingLevel={3}
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
