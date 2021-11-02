import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import formatRequestVisitEmail from "./formatRequestVisitEmail";

/*

npm test -- formatRequestVisitEmail

*/

const formValues = {
  library: "96th-street",
  visitType: "virtual",
  organization: "YMCA",
  noSchoolOrOrg: true,
  ageGroup: ["age-children", "age-teenagers"],
  contactName: "George Constanza",
  contactEmail: "george@seinfeld.com",
  virtualVisitServices: ["services-introduction"],
  virtualVisitServicesOther: "",
  inPersonServices: "in-person-group-tour",
  inPersonServicesOther: "",
};

describe("formatRequestVisitEmail", () => {
  test("Virtual services checkbox values render correctly.", () => {
    formValues.virtualVisitServices = ["services-introduction"];
    formValues.virtualVisitServicesOther = "";
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("vv-services", {
        name: /Virtual Visit Services: services-introduction/,
      })
    );
  });

  test("Virtual services other value renders correctly.", () => {
    formValues.virtualVisitServices = ["services-introduction"];
    formValues.virtualVisitServicesOther = "Some other request";
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("vv-services", {
        name: /Virtual Visit Services: Some other request/,
      })
    );
  });

  test("In person services radio value renders correctly.", () => {
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("ip-services", {
        name: /In Person Visit Services: in-person-group-tour/,
      })
    );
  });

  test("In person services other value renders correctly.", () => {
    formValues.inPersonServicesOther = "Some other service.";
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("ip-services", {
        name: /In Person Visit Services: Some other service/,
      })
    );
  });

  test("No organization selected renders correctly.", () => {
    formValues.organization = "";
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("organization", { name: /School or Organization: none/ })
    );
  });

  test("Organization with text value renders correctly.", () => {
    formValues.organization = "Columbia University";
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("organization", {
        name: /School or Organization: Columbia University/,
      })
    );
  });

  test("Age group form field array renders correctly.", () => {
    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );
    expect(
      getByTestId("ageGroup", {
        name: /Age Group or Grade: age-teenagers, age-adults/,
      })
    );
  });
});
