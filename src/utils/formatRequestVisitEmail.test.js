import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import formatRequestVisitEmail from "./formatRequestVisitEmail";

/*

npm test -- formatRequestVisitEmail

*/

describe("formatRequestVisitEmail", () => {
  test("Email is formatted correctly", () => {
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
      inPersonServices: "",
      inPersonServicesOther: "",
    };

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

  test("Email for no organization displays none.", () => {
    const formValues = {
      library: "96th-street",
      visitType: "virtual",
      organization: "",
      noSchoolOrOrg: true,
      ageGroup: ["age-children", "age-teenagers"],
      contactName: "George Constanza",
      contactEmail: "george@seinfeld.com",
      virtualVisitServices: ["services-introduction"],
      virtualVisitServicesOther: "",
      inPersonServices: "",
      inPersonServicesOther: "",
    };

    const emailBody = formatRequestVisitEmail(formValues);
    const { getByTestId } = render(
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    );

    expect(
      getByTestId("organization", { name: /School or Organization: none/ })
    );
  });
});
