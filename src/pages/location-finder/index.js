import { getDataFromTree } from '@apollo/react-ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Layout from './../../components/shared/layouts/Main';
import SearchBar from './../../components/location-finder/SearchBar';
import Locations from './../../components/location-finder/Locations/Locations';

function LocationFinder() {
  return (
    <Layout>
      <SearchBar />
      <Locations />
    </Layout>
  );
}

export default compose(withApollo, withRedux)(LocationFinder)
