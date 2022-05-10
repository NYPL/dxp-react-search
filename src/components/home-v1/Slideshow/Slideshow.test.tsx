import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  author: "writer 1",
  genre: "genre",
  audience: "people",
  image: "https://placeimg.com/400/200/arch",
  link: "https://www.nypl.org/",
  location: "Stephen A. Schwarzman Building",
};
const items = [
  {
    id: "test-id-1",
    title: "Test",
    author: "writer 1",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-2",
    title: "Test",
    author: "writer 2",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-3",
    title: "Test",
    author: "writer 3",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-4",
    title: "Test",
    author: "writer 4",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
];

xdescribe("SlideshowButton tests", () => {
  let prevSlide: jest.MockedFunction<() => void>;
  let nextSlide: jest.MockedFunction<() => void>;

  beforeEach(() => {
    prevSlide = jest.fn();
    nextSlide = jest.fn();
  });
  it("should pass axe accessibility test", async () => {
    const { container } = render(<SlideshowButton direction="next" />);
  });
  it("should render correct button according to direction prop", () => {
    render(<SlideshowButton direction="next" />);
    expect(screen.getByRole("button", { name: />/i })).toBeInTheDocument();
  });
  it("should call correct function when clicked", () => {
    render(
      <SlideshowButton
        direction="next"
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
    userEvent.click(screen.getByRole("button", { name: />/i }));
    expect(nextSlide).toBeCalledTimes(1);
    expect(prevSlide).not.toBeCalled();
  });
  it("should render the UI snapshot correctly", () => {
    const nextButton = renderer
      .create(<SlideshowButton direction="next" nextSlide={nextSlide} />)
      .toJSON();
    const prevButton = renderer
      .create(<SlideshowButton direction="prev" prevSlide={prevSlide} />)
      .toJSON();
    expect(nextButton).toMatchSnapshot();
    expect(prevButton).toMatchSnapshot();
  });
});

xdescribe("SlideshowContainer tests", () => {
  //   it("shold pass axe accessibility test", async () => {
  //     const { container } = render(<SlideshowContainer items={items} />);
  //   });
  it("shold render list of cards ", () => {});
  it("should render the UI snapshot correctly", () => {});
});

xdescribe("Slideshow tests", () => {
  it("shold pass axe accessibility test", async () => {
    const { container } = render(
      <Slideshow title="Test" link="https://nypl.com" items={items} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("shold not show the prev button upon rendering", () => {});
  it("shold show the prev button ones the next button has been clicked", () => {});
  it("shold move the SlideshowContainer to the left if the next button is clicked", () => {});
  it("shold move the SlideshowContainer to the right if the prev button is clicked", () => {});
  it("shold should hide the next button when the end of the is reached", () => {});
  it("should render the UI snapshot correctly", () => {});
});
