import React, { Component, useState } from 'react';
import * as DS from '@nypl/design-system-react-components';
// Google map
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose } from 'recompose';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMapInfoWindow } from './../../../redux/actions';
// Apollo
import { useQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';

const MapWrapper = compose(withScriptjs, withGoogleMap)(props => {
  // Redux
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    openNow
  } = useSelector(state => state.search);
  const {
    mapCenter,
    mapZoom,
    infoWindowId,
    infoWindowIsVisible
  } = useSelector(state => state.map);

  // Apollo
  const { loading, error, data } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        openNow
      }
    }
  );

  if (loading || !data) {
    console.log(loading);

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

        // Location link
        const locationLink = `https://www.nypl.org/locations/${location.id}`;

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
                    <DS.Link
                      href={locationLink}
                    >
                    {location.name}
                    </DS.Link>
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
  const dispatch = useDispatch();

  function handleClick(location, event) {
    dispatch(setMapInfoWindow({
      infoWindowId: location.id,
      infoWindowIsVisible: true
    }));
  }

  return (
    <MapWrapper
      aria-hidden="true"
      onClick={handleClick}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `500px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Map;
