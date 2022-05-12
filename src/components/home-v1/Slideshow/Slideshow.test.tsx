import * as React from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
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
describe("useSlideshow tests", () => {
  // Mock useSlideshow hook
  // jest.mock("./useSlideshowStyle", () => {
  //   const { currentSlide, prevSlide, nextSlide, slideshowStyle } =
  //     useSlideshowStyles(items.length, 11);
  //   return {
  //     useSlideshowStyles: () => {
  //       return { currentSlide, prevSlide, nextSlide, slideshowStyle };
  //     },
  //   };
  // });
  // const mockUseSlideshowStyle = useSlideshowStyles as jest.MockedFunction<
  //   typeof useSlideshowStyles
  // >;
  it("should provide the currentSlide as a number and the slideshowStyle as an object", () => {});
  it("should provide a nextSlide  function that moves pointer of currentSlide to the next Slide", () => {});
  it("should provide a prevSlide function that moves pointer of currentSlide to the previous Slide", () => {});
  it("should update the slideshowStyles with according to the currentSlide", () => {});
});
xdescribe("SlideshowButton tests", () => {
  it("should pass axe accessibility test", async () => {
    const { container } = render(<SlideshowButton direction="next" />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should render correct button according to direction prop", () => {
    render(<SlideshowButton direction="next" />);
    expect(screen.getByRole("button", { name: />/i })).toBeInTheDocument();
  });
  it("should call correct function when clicked", () => {
    const { result } = renderHook(() => useSlideshowStyles(items.length, 11));
    let spyNextSlide = jest.spyOn(result.current, "nextSlide");
    let spyPrevSlide = jest.spyOn(result.current, "prevSlide");

    render(
      <SlideshowButton
        direction="next"
        nextSlide={spyNextSlide}
        prevSlide={spyPrevSlide}
      />
    );
    act(() => userEvent.click(screen.getByRole("button", { name: />/i })));
    expect(spyNextSlide).toBeCalledTimes(1);
    expect(spyPrevSlide).not.toBeCalled();
  });
  it("should render the UI snapshot correctly", () => {
    // Mock passe in functions
    let prevSlide = jest.fn();
    let nextSlide = jest.fn();
    // Alternative option to mock hook
    // const { result } = renderHook(() => useSlideshowStyles(items.length, 11));
    // const { prevSlide, nextSlide } = result.current;
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

describe("SlideshowContainer tests", () => {
  // Mock useSlideshow hook
  const { result } = renderHook(() => useSlideshowStyles(items.length, 11));
  const { currentSlide, prevSlide, nextSlide, slideshowStyle } = result.current;
  xit("should pass axe accessibility test", async () => {
    const { container } = render(
      <SlideshowContainer
        items={items}
        slideshowStyle={slideshowStyle}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should render list of cards ", () => {
    render(
      <SlideshowContainer
        items={items}
        slideshowStyle={slideshowStyle}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
  it("should render the UI snapshot correctly", () => {
    const slideshowContainer = renderer
      .create(
        <SlideshowContainer
          items={items}
          slideshowStyle={slideshowStyle}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      )
      .toJSON();
    expect(slideshowContainer).toMatchSnapshot();
  });
});

xdescribe("Slideshow tests", () => {
  it("shold pass axe accessibility test", async () => {
    const { container } = render(
      <Slideshow title="Test" link="https://nypl.com" items={items} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should not show the prev button upon rendering", () => {
    render(<Slideshow title="Test" link="https://nypl.com" items={items} />);
    expect(
      screen.queryByRole("button", { name: /</i })
    ).not.toBeInTheDocument();
  });
  it("should show the prev button ones the next button has been clicked", () => {
    render(<Slideshow title="Test" link="https://nypl.com" items={items} />);
    userEvent.click(screen.getByRole("button", { name: />/i }));
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
  });
  // @QUESTION can this be tested? does not show margin value/ can't access position
  xit("should move the SlideshowContainer to the left if the next button is clicked", () => {
    render(<Slideshow title="Test" link="https://nypl.com" items={items} />);
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
    render(<Slideshow title="Test" link="https://nypl.com" items={items} />);
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
