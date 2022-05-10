import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
expect.extend(toHaveNoViolations);
import renderer from "react-test-renderer";
// Component
import Slideshow from "./Slideshow";
import SlideshowContainer from "./SlideshowContainer";
import SlideshowButton from "./SlideshowButton";

const item = {
  id: "test-id-1",
  title: "Test",
  image: "https://placeimg.com/400/200/arch",
  link: "https://www.nypl.org/",
  location: "Stephen A. Schwarzman Building",
};
const items = [
  {
    id: "test-id-1",
    title: "Test",
    image: "https://placeimg.com/400/200/arch",
    link: "https://www.nypl.org/",
  },
  {
    id: "test-id-2",
    title: "Test",
    image: "https://placeimg.com/400/200/arch",
    link: "https://www.nypl.org/",
  },
  {
    id: "test-id-3",
    title: "Test",
    image: "https://placeimg.com/400/200/arch",
    link: "https://www.nypl.org/",
  },
  {
    id: "test-id-4",
    title: "Test",
    image: "https://placeimg.com/400/200/arch",
    link: "https://www.nypl.org/",
  },
];

describe("SlideshowButton tests", () => {
  it("shold pass axe accessibility test", () => {});
  it("should have the correct ");
  it("should call useSlideshow when clicked", () => {});
  it("should render the UI snapshot correctly", () => {});
});

describe("SlideshowContainer tests", () => {
  it("shold pass axe accessibility test", () => {});
  it("shold render list of cards ", () => {});
  it("should render the UI snapshot correctly", () => {});
});

describe("Slideshow tests", () => {
  it("shold pass axe accessibility test", () => {});
  it("shold not show the prev button upon rendering", () => {});
  it("shold show the prev button ones the next button has been clicked", () => {});
  it("shold move the SlideshowContainer to the left if the next button is clicked", () => {});
  it("shold move the SlideshowContainer to the right if the prev button is clicked", () => {});
  it("shold should hide the next button when the end of the is reached", () => {});
  it("should render the UI snapshot correctly", () => {});
});
