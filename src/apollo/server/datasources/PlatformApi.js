import { RESTDataSource } from 'apollo-datasource-rest';
//const { PLATFORM_API } = process.env;
// Utils
import validateCardNumber from './../../../utils/luhnValidate';

class PlatformApi extends RESTDataSource {
  constructor() {
    super();
    //this.baseURL = PLATFORM_API;
    this.baseURL = 'https://platform.nypl.org'
  }
  
  // @TODO Set the bearer token. 
  /*willSendRequest(request) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers = {
      Authorization: `Basic ${process.env.EXAMPLE_API_KEY}`,
      "Content-Type": "application/json",
      "API-Version": "2021-03-14",
    };
  }
  */

  // /v0.1/patrons/validate
  async validatePatronCard(args) {
    // @TODO This would eventually switch to returning the data from 
    // platform api, for now, we can just use a local code validation
    // method an return a similar valid/invalid object as the response.
    //const response = await this.post(`/api/v0.1/patrons/validate`);
    
    let valid = false;
    if (validateCardNumber(args.barcode)) {
      valid = true;
    }

    return {
      "id": 'patron-test-1234',
      "valid": valid,
      "message": "Valid patron barcode and pin"
    };
  }

}

export default PlatformApi;
