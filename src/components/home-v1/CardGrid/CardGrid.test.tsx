import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
expect.extend(toHaveNoViolations);
import renderer from "react-test-renderer";
// Component
import Card from "./Card";
import CardGrid from "./CardGrid";

const item = {
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
  location: "Stephen A. Schwarzman Building",
};

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

describe("Card tests", () => {
  it("should pass axe accessibility tests", async () => {
    const { container } = render(
      <Card item={item} gaEventActionName={"cardTest"} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should render a h3 with the title", () => {
    render(<Card item={item} gaEventActionName={"cardTest"} />);
    expect(
      screen.getByRole("heading", { name: /Test/i, level: 3 })
    ).toBeInTheDocument();
  });
  // Image should have alt text or have role="none"/"presentatio"
  // it("should render an image", () => {});
  it("should add a aria-describedby with additional information", () => {
    render(<Card item={item} gaEventActionName={"cardTest"} />);
    expect(screen.getByRole("heading", { name: /Test/i })).toHaveAttribute(
      "aria-describedby",
      "test-id-1-location"
    );
  });
  it("should render the UI snapshot correctly", () => {
    const basicCard = renderer
      .create(<Card item={item} gaEventActionName={"cardTest"} />)
      .toJSON();
    expect(basicCard).toMatchSnapshot();
  });
});

describe("CardGrid tests", () => {
  it("should pass axe accessibility test with children components", async () => {
    const { container } = render(
      <CardGrid title="Test title" link="https://nypl.com" items={items} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should render list of items passed to the component", () => {
    render(
      <CardGrid title="Test title" link="https://nypl.com" items={items} />
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
  it("should render the UI snapshot correctly", () => {
    const cardGrid = renderer
      .create(
        <CardGrid title="Test title" link="https://nypl.com" items={items} />
      )
      .toJSON();
    expect(cardGrid).toMatchSnapshot();
  });
});
