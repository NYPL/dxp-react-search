import React, { Fragment } from 'react';
import { Icon, Link } from '@nypl/design-system-react-components';
// Google map
import { 
  withGoogleMap, 
  withScriptjs, 
  GoogleMap, 
  Marker, 
  InfoWindow 
} from 'react-google-maps';
import { compose } from 'recompose';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMapInfoWindow } from './../../../redux/actions';
// Apollo
import { useQuery } from '@apollo/client';
//import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
import { LocationsQuery as LOCATIONS_QUERY } from './../../../apollo/client/queries/Locations.gql';

// Hooks
import useWindowSize from './../../../hooks/useWindowSize';
// Utils
import setTermsFilter from './../../../utils/setTermsFilter';

const MapWrapper = compose(withScriptjs, withGoogleMap)(props => {
  // Redux
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    openNow,
    offset,
    pageNumber,
    searchFilters
  } = useSelector(state => state.search);
  const {
    mapCenter,
    mapZoom,
    infoWindowId,
    infoWindowIsVisible
  } = useSelector(state => state.map);

  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize < 600) {
    limit = 10;
  }
  
  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;
  // Convert the searchFilters to the object format needed by gql.
  const termIds = setTermsFilter(searchFilters);

  const { loading, error, data } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng,
        openNow,
        termIds,
        limit,
        offset,
        pageNumber
      }
    }
  );

  if (loading || !data) {
    return (
      <div>Loading</div>
    );
  }

  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  return (
    <GoogleMap
      defaultOptions={{mapTypeControl: false}}
      zoom={mapZoom}
      center={mapCenter}
    >
      {searchQueryGeoLat && searchQueryGeoLng &&
        <Marker
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new google.maps.Size(32, 32)
          }}
          position={{
            lat: searchQueryGeoLat,
            lng: searchQueryGeoLng
          }}
        />
      }
      {data.allLocations.locations.map(location => {
        // Binds onClick from Map prop
        const onClick = props.onClick.bind(this, location);

        return (
          <Marker
            key={location.id}
            onClick={onClick}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(32, 32)
            }}
            position={{
              lat: location.geoLocation.lat,
              lng: location.geoLocation.lng
            }}
          >
            {infoWindowIsVisible && infoWindowId === location.id &&
              <InfoWindow>
                <div>
                  <div>
                    <Link href={location.url}>
                      {location.name}
                    </Link>
                  </div>
                  <div>{location.address_line1}</div>
                  <div>{location.locality}, {location.administrative_area}, {location.postal_code}</div>
                </div>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  );
});

function Map() {
  // Redux
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  function handleClick(location, event) {
    dispatch(setMapInfoWindow({
      infoWindowId: location.id,
      infoWindowIsVisible: true
    }));

    // Scroll to location on list when map marker is clicked for desktop only.
    if (windowSize >= 600) {
      // Set focus
      document.querySelector(`#lid-${location.id} a`).focus();
      // Scroll into view.
      document.getElementById(`lid-${location.id}`).scrollIntoView({
        alignToTop: false,
        behavior: 'smooth'
      });
    }
  }

  return (
    <Fragment>
      <MapWrapper
        aria-hidden="true"
        onClick={handleClick}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <Link
        href="#locations-list"
        className="locations-list-anchor"
      >
        Back to List
        <Icon
          blockName="more-link"
          iconRotation="rotate-180"
          decorative
          modifiers={[
            'right'
          ]}
          name="arrow"
        />
      </Link>
    </Fragment>
  );
}

export default Map;
