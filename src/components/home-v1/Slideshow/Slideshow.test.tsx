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
import useSlideshowStyles from "./useSlideshow";

const items = [
  {
    id: "test-id-1",
    title: "Test 1",
    author: "writer 1",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-2",
    title: "Test 2",
    author: "writer 2",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-3",
    title: "Test 3",
    author: "writer 3",
    genre: "genre",
    audience: "people",
    image: "https://placeimg.com/400/200/arch",
    url: "https://www.nypl.org/",
  },
  {
    id: "test-id-4",
    title: "Test 4",
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
  //   it("should pass axe accessibility test", async () => {
  //     const { container } = render(<SlideshowContainer items={items} />);
  //   });
  it("should render list of cards ", () => {});
  it("should render the UI snapshot correctly", () => {});
});

describe("Slideshow tests", () => {
  beforeEach(() => {
    render(<Slideshow title="Test" link="https://nypl.com" items={items} />);
  });
  it("shold pass axe accessibility test", async () => {
    const { container } = render(
      <Slideshow title="Test" link="https://nypl.com" items={items} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should not show the prev button upon rendering", () => {
    expect(
      screen.queryByRole("button", { name: /</i })
    ).not.toBeInTheDocument();
  });
  it("should show the prev button ones the next button has been clicked", () => {
    userEvent.click(screen.getByRole("button", { name: />/i }));
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
  });
  // @QUESTION can this be tested? does not show margin value/ can't access position
  xit("should move the SlideshowContainer to the left if the next button is clicked", () => {
    const prevPosition = screen
      .getByRole("heading", { name: /Test 1/i })
      .getBoundingClientRect();
    console.log(prevPosition);
    userEvent.click(screen.getByRole("button", { name: />/i }));
    const nextPosition = screen
      .getByRole("heading", { name: /Test 1/i })
      .getBoundingClientRect();
    console.log(nextPosition);
  });
  // @QUESTION can this be tested? does not show margin value/ can't access position
  xit("should move the SlideshowContainer to the right if the prev button is clicked", () => {});
  it("should hide the next button when the end of the list is reached", () => {
    userEvent.click(screen.getByRole("button", { name: />/i }));
    userEvent.click(screen.getByRole("button", { name: />/i }));
    userEvent.click(screen.getByRole("button", { name: />/i }));
    //renders prev button
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
    //does not render next button
    expect(
      screen.queryByRole("button", { name: />/i })
    ).not.toBeInTheDocument();
  });
  it("should render the UI snapshot correctly", () => {
    const basicView = renderer
      .create(<Slideshow title="Test" link="https://nypl.com" items={items} />)
      .toJSON();
    expect(basicView).toMatchSnapshot();
  });
});
