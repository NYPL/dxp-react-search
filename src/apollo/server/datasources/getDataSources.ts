import RefineryApi from "./RefineryApi";
import DrupalApi from "./DrupalApi";
import DrupalJsonApi from "./drupal-json-api/DrupalJsonApi";
import PlatformApi from "./PlatformApi";
//import SendGridApi from "./SendGridApi";
import CommunicoApi from "./CommunicoApi";

export default function getDataSources() {
  //export const getDataSources = () => {
  return {
    refineryApi: new RefineryApi(),
    drupalApi: new DrupalApi(),
    drupalJsonApi: new DrupalJsonApi(),
    platformApi: new PlatformApi(),
    // @TODO Throws ModuleNotFoundError:
    // Module not found: Error: Can't resolve 'fs' in '/Users/williamluisi/nodejs-apps/dxp-react-search/node_modules/@sendgrid/helpers/classes'
    //sendGridApi: new SendGridApi(),
    communicoApi: new CommunicoApi(),
  };
}
