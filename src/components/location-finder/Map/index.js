import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
// Redux
import { useSelector } from 'react-redux';

function Map({props}) {
  const { searchQueryGeoLat, searchQueryGeoLng } = useSelector(state => state.search);  

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.7831, lng: -73.9712 }}
    >
      <Marker position={{ lat: searchQueryGeoLat, lng: searchQueryGeoLng }} />
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
