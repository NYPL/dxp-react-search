import RefineryApi from "./RefineryApi";
import DrupalApi from "./DrupalApi";
import DrupalJsonApi from "./drupal-json-api/DrupalJsonApi";
import PlatformApi from "./PlatformApi";
import SendGridApi from "./SendGridApi";

export interface DataSource {
  refineryApi: RefineryApi;
  drupalApi: DrupalApi;
  drupalJsonApi: DrupalJsonApi;
  platformApi: PlatformApi;
  sendGridApi: SendGridApi;
}

export default function getDataSources() {
  return {
    refineryApi: new RefineryApi(),
    drupalApi: new DrupalApi(),
    drupalJsonApi: new DrupalJsonApi(),
    platformApi: new PlatformApi(),
    sendGridApi: new SendGridApi(),
  };
}
