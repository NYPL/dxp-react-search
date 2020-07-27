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

  // @TODO move this to redux state as default, then you can update
  // the state when user clicks "View on Map" link in Location comp?
  const defaultCenter = {
    lat: 40.7532,
    lng: -73.9822
  };

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={defaultCenter}
    >
      <Marker
        position={{
          lat: searchQueryGeoLat,
          lng: searchQueryGeoLng
        }}
      />
      {props.locations.map(location => {
        const onClick = props.onClick.bind(this, location);

        return (
          <Marker
            key={location.id}
            onClick={onClick}
            position={{
              lat: location.geoLocation.lat,
              lng: location.geoLocation.lng
            }}
          >
            {props.selectedMarker === location &&
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

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: false
    }
  }

  handleClick = (location, event) => {
    this.setState({ selectedMarker: location })
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
