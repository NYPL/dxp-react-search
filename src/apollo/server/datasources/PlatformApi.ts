import { RESTDataSource } from "@apollo/datasource-rest";
import validateCardNumber from "./../../../utils/luhnValidate";

class PlatformApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://platform.nypl.org";
  }

  // /v0.1/patrons/validate
  async validatePatronCard(args: any) {
    // @TODO This would eventually switch to returning the data from
    // platform api, for now, we can just use a local code validation
    // method an return a similar valid/invalid object as the response.
    //const response = await this.post(`/api/v0.1/patrons/validate`);

    const isValidBardCode = validateCardNumber(args.barcode) ? true : false;

    return {
      id: "patron-test-1234",
      valid: isValidBardCode,
      message: "Valid patron barcode and pin",
    };
  }
}

export default PlatformApi;
