import React, { Component } from 'react';
// Google map
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose } from 'recompose';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
// Redux
import { useSelector } from 'react-redux';

const MapWrapper = compose(withScriptjs, withGoogleMap)(props => {
  // Redux
  const { searchQueryGeoLat, searchQueryGeoLng } = useSelector(state => state.search);
  const { mapCenter, mapZoom, locationInfoWindowId } = useSelector(state => state.map);

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
      {props.locations.map(location => {
        const onClick = props.onClick.bind(this, location);

        // Logic for info window
        // @TODO Need to clean this up and probs just manage
        // the location id in redux state, not a mix of local state
        // and redux state like it is now.
        let showInfoWindow = false;
        if (props.selectedMarker === location.id
        || locationInfoWindowId === location.id) {
          showInfoWindow = true;
        }

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
            {showInfoWindow &&
              <InfoWindow>
                <div>
                  <div>{location.name}</div>
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

// @TODO Change this to use hooks instead like rest of app?
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: false
    }
  }

  handleClick = (location, event) => {
    // @TODO Change this Class component to functional, and
    // dispatch redux action here.
    this.setState({ selectedMarker: location.id })
  }

  render() {
    return (
      <MapWrapper
        locations={this.props.locations}
        selectedMarker={this.state.selectedMarker}
        onClick={this.handleClick}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
