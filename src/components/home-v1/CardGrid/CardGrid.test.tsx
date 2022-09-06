import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
expect.extend(toHaveNoViolations);
import renderer from "react-test-renderer";
// Component
import CardGrid from "./CardGrid";

const items = [
  {
    id: "test-id-1",
    title: "Test",
    image: {
      id: "test-id-1",
      alt: "image-1-alt-text",
      layout: "responsive",
      width: 400,
      height: 200,
      quality: 90,
      uri: "https://placeimg.com/400/200/arch",
      useTransformation: false,
      transformationLabel: "2_1_960",
    },
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-2",
    title: "Test",
    image: {
      id: "test-id-2",
      alt: "image-2-alt-text",
      layout: "responsive",
      width: 400,
      height: 200,
      quality: 90,
      uri: "https://placeimg.com/400/200/arch",
      useTransformation: false,
      transformationLabel: "2_1_960",
    },
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-3",
    title: "Test",
    image: {
      id: "test-id-3",
      alt: "image-3-alt-text",
      layout: "responsive",
      width: 400,
      height: 200,
      quality: 90,
      uri: "https://placeimg.com/400/200/arch",
      useTransformation: false,
      transformationLabel: "2_1_960",
    },
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-4",
    title: "Test",
    image: {
      id: "test-id-4",
      alt: "image-4-alt-text",
      layout: "responsive",
      width: 400,
      height: 200,
      quality: 90,
      uri: "https://placeimg.com/400/200/arch",
      useTransformation: false,
      transformationLabel: "2_1_960",
    },
    url: "https://www.nypl.org/",
  },
];

describe("CardGrid tests", () => {
  it("should pass axe accessibility test with children components", async () => {
    const { container } = render(
      <CardGrid title="Test title" link="https://nypl.com" items={items} />
    );
    await waitFor(async () =>
      expect(await axe(container)).toHaveNoViolations()
    );
  });
  it("should render list of items passed to the component", async () => {
    render(
      <CardGrid title="Test title" link="https://nypl.com" items={items} />
    );
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(4)
    );
  });
  it("should render the UI snapshot correctly", async () => {
    const cardGrid = renderer
      .create(
        <CardGrid title="Test title" link="https://nypl.com" items={items} />
      )
      .toJSON();
    await waitFor(() => expect(cardGrid).toMatchSnapshot());
  });
});
