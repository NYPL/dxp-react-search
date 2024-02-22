import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import { render } from "./../../../../testHelper/customRtlRender";
import OnlineResourceCard from "./OnlineResourceCard";

expect.extend(toHaveNoViolations);

const mockDataItem = {
  id: "3250e780-db3b-4669-b920-06ab3316eba8",
  slug: "/research/collections/articles-databases/bookflix",
  name: "BookFlix",
  description:
    "BookFlix pairs classic fictional video storybooks from Weston Woods with nonfiction eBooks from Scholastic. (PreK - 3)  ",
  accessibilityLink: null,
  termsConditionsLink: "http://golla.grolier.com.i.ezproxy.nypl.org/terms",
  privacyPolicyLink:
    "http://www.scholastic.com.i.ezproxy.nypl.org/edtechprivacy.htm",
  subjects: [
    {
      id: "90c671e4-bf86-4fa8-ba53-414ee03e1456",
      name: "Reference",
    },
  ],
  accessLocations: [
    {
      id: "50b5b1c6-e01f-4728-befb-90578bb0d1d4",
      name: "Stephen A. Schwarzman Building",
      url: "http://qa-d8.nypl.org/locations/schwarzman",
    },
    {
      id: "3694177c-7eba-4b4a-82df-a1064e599416",
      name: "The New York Public Library for the Performing Arts, Dorothy and Lewis B. Cullman Center",
      url: "http://qa-d8.nypl.org/locations/lpa",
    },
    {
      id: "8b887855-3660-4379-a51d-52ea479c8b8e",
      name: "Schomburg Center for Research in Black Culture",
      url: "http://qa-d8.nypl.org/locations/schomburg",
    },
    {
      id: "7b2d2165-95aa-4c9e-93b9-d7fe6127c279",
      name: "Thomas Yoseloff Business Center",
      url: "http://qa-d8.nypl.org/locations/snfl/yoseloff-business",
    },
    {
      __typename: "AccessLocation",
      id: "offsite-uuid",
      name: "Outside the Library",
      url: null,
    },
  ],
  accessibleFrom: ["onsite", "offsite"],
  resourceUrl: "https://www.google.com",
  resourceUrls: {
    main: "https://mainurl.com",
    onsite: "https://onsiteurl.com",
    offsite: "https://offsiteurl.com",
  },
  notes: null,
  language: "English",
  authenticationType: "vendor_authentication",
  isCoreResource: false,
  isFreeResource: false,
  availabilityStatus: "card_required",
};

describe("OnlineResourceCard Component", () => {
  test("If a resource has subjects, they should display with a label.", () => {
    render(<OnlineResourceCard item={mockDataItem} />);

    expect(screen.getByText("Subjects:")).toBeInTheDocument();
    expect(screen.getByText("Reference")).toBeInTheDocument();
  });

  test("If a resource has no subjects, then I should not see a Subjects label", () => {
    const mockData = {
      id: "3250e780-db3b-4669-b920-06ab3316eba8",
      slug: "/research/collections/articles-databases/bookflix",
      name: "BookFlix",
      description:
        "BookFlix pairs classic fictional video storybooks from Weston Woods with nonfiction eBooks from Scholastic. (PreK - 3)  ",
      accessibilityLink: null,
      termsConditionsLink: "http://golla.grolier.com.i.ezproxy.nypl.org/terms",
      privacyPolicyLink:
        "http://www.scholastic.com.i.ezproxy.nypl.org/edtechprivacy.htm",
      accessibleFrom: ["onsite", "offsite"],
      resourceUrl: "https://www.google.com",
      resourceUrls: {
        main: "https://mainurl.com",
        onsite: "https://onsiteurl.com",
        offsite: "https://offsiteurl.com",
      },
      notes: null,
      language: "English",
      authenticationType: "vendor_authentication",
      isCoreResource: false,
      isFreeResource: false,
      availabilityStatus: "card_required",
      accessLocations: [],
      subjects: null,
    };

    render(<OnlineResourceCard item={mockData} />);

    expect(screen.queryByText("Subjects:")).not.toBeInTheDocument();
  });

  test("If a resource has no access locations, then I should not see an Access Locations label", () => {
    const mockData = {
      id: "3250e780-db3b-4669-b920-06ab3316eba8",
      slug: "/research/collections/articles-databases/bookflix",
      name: "BookFlix",
      description:
        "BookFlix pairs classic fictional video storybooks from Weston Woods with nonfiction eBooks from Scholastic. (PreK - 3)  ",
      accessibilityLink: null,
      termsConditionsLink: "http://golla.grolier.com.i.ezproxy.nypl.org/terms",
      privacyPolicyLink:
        "http://www.scholastic.com.i.ezproxy.nypl.org/edtechprivacy.htm",
      accessibleFrom: ["onsite", "offsite"],
      resourceUrl: "https://www.google.com",
      resourceUrls: {
        main: "https://mainurl.com",
        onsite: "https://onsiteurl.com",
        offsite: "https://offsiteurl.com",
      },
      notes: null,
      language: "English",
      authenticationType: "vendor_authentication",
      isCoreResource: false,
      isFreeResource: false,
      availabilityStatus: "card_required",
      accessLocations: [],
      subjects: null,
    };

    render(<OnlineResourceCard item={mockData} />);

    expect(screen.queryByText("Access Locations:")).not.toBeInTheDocument();
  });
});

// Accessbiility tests.
it("should not have basic accessibility issues", async () => {
  const { container } = render(<OnlineResourceCard item={mockDataItem} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
