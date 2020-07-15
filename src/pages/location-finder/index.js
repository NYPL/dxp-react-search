import { getDataFromTree } from '@apollo/react-ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Layout from './../../components/shared/layouts/Main';
import Locations from './../../components/location-finder/Locations/Locations';
import Map from './../../components/location-finder/Map';
import SearchBar from './../../components/location-finder/SearchBar';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;

function LocationFinder() {
  return (
    <Layout>
      <h1>Location Finder</h1>
      <SearchBar />
      <div className='location-finder-wrapper'>
        <div className='row'>
          <div className='column'>
            <Locations />
          </div>
          <div className='column'>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(LocationFinder)
