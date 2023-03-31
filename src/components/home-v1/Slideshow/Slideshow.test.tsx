import * as React from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { act as utilAct } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
expect.extend(toHaveNoViolations);
import renderer from "react-test-renderer";
// Component
import Slideshow from "./Slideshow";
import SlideshowButton from "./SlideshowButton";
import SlideshowContainer from "./SlideshowContainer";
import useSlideshowStyles from "./useSlideshow";

// Items rendered for Slideshow comonent tests
const items = [
  {
    id: "test-id-1",
    title: "Test 1",
    author: "writer 1",
    genre: "genre",
    audience: "people",
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
    title: "Test 2",
    author: "writer 2",
    genre: "genre",
    audience: "people",
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
    title: "Test 3",
    author: "writer 3",
    genre: "genre",
    audience: "people",
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
    title: "Test 4",
    author: "writer 4",
    genre: "genre",
    audience: "people",
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

// Util function to resize viewport
const resizeWindow = (x: number) => {
  window.innerWidth = x;
  utilAct(() => {
    window.dispatchEvent(new Event("resize"));
  });
};

// Setup function for userEvent tests with component
function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("useSlideshow tests", () => {
  it("returns two functions, the currentSlide number and a CSS style object", () => {
    const { result } = renderHook(() => useSlideshowStyles());
    expect(typeof result.current.nextSlide).toEqual("function");
    expect(typeof result.current.prevSlide).toEqual("function");
    expect(typeof result.current.currentSlide).toEqual("number");
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-0%",
      transition: "all .5s",
    });
  });
  it("should update the currentSlide and the slideshowStyle obeject when the nextSlide/prevSlide function is called", () => {
    // The second argument passed determins the with in percent of each slide
    const { result } = renderHook(() => useSlideshowStyles(items.length, 100));
    const mockPrevSlide = result.current.prevSlide;
    const mockNextSlide = result.current.nextSlide;
    // Starts on first slide
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-0%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(0);
    // Try to move to a previous slide when on first slide
    act(() => mockPrevSlide());
    // Stayes on first slide
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-0%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(0);
    // Move two slides
    act(() => mockNextSlide());
    act(() => mockNextSlide());
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-200%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(2);
    // Move to previsou slide
    act(() => mockPrevSlide());

    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-100%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(1);
    // Move to last slide
    act(() => mockNextSlide());
    act(() => mockNextSlide());
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-300%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(3);
    // Try to move passed the last slide
    act(() => mockNextSlide());
    act(() => mockNextSlide());
    // Expect to be still on the last slide
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-300%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(3);
    // Move to previous slide
    act(() => mockPrevSlide());
    expect(result.current.slideshowStyle).toEqual({
      marginLeft: "-200%",
      transition: "all .5s",
    });
    expect(result.current.currentSlide).toEqual(2);
  });
});

describe("SlideshowButton tests", () => {
  it("should pass axe accessibility test", async () => {
    const { container } = render(<SlideshowButton buttonDirection="next" />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should render correct button according to direction prop", () => {
    // Render button with direction set to next should render the next button
    const { rerender } = render(<SlideshowButton buttonDirection="next" />);
    expect(screen.getByRole("button", { name: />/i })).toBeInTheDocument();
    // Render button with direction set to prev should render the next button
    rerender(<SlideshowButton buttonDirection="prev" />);
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
  });
  it("should call the nextSlide function when the next button is clicked", async () => {
    const user = userEvent.setup();
    const prevSlide = jest.fn();
    const nextSlide = jest.fn();

    render(
      <SlideshowButton
        buttonDirection="next"
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
    await user.click(screen.getByRole("button", { name: />/i }));
    expect(nextSlide).toBeCalledTimes(1);
    expect(prevSlide).not.toBeCalled();
  });
  it("should call the prevSlide function when the previous button is clicked", async () => {
    const user = userEvent.setup();
    const prevSlide = jest.fn();
    const nextSlide = jest.fn();

    render(
      <SlideshowButton
        buttonDirection="prev"
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
    await user.click(screen.getByRole("button", { name: /</i }));
    expect(prevSlide).toBeCalledTimes(1);
    expect(nextSlide).not.toBeCalled();
  });
  it("should render the UI snapshot correctly", () => {
    // Mock passe in functions
    const prevSlide = jest.fn();
    const nextSlide = jest.fn();

    const nextButton = renderer
      .create(<SlideshowButton buttonDirection="next" nextSlide={nextSlide} />)
      .toJSON();
    const prevButton = renderer
      .create(<SlideshowButton buttonDirection="prev" prevSlide={prevSlide} />)
      .toJSON();
    expect(nextButton).toMatchSnapshot();
    expect(prevButton).toMatchSnapshot();
  });
});

describe("SlideshowContainer tests", () => {
  const prevSlide = jest.fn();
  const nextSlide = jest.fn();

  // Call useSlideshow hook to get props for SlideshowContainer component
  const { result } = renderHook(() => useSlideshowStyles(items.length, 11));
  const { currentSlide, slideshowStyle } = result.current;

  it("should pass axe accessibility test", async () => {
    const { container } = render(
      <SlideshowContainer
        items={items}
        slideshowStyle={slideshowStyle}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        sectionTitle={"testSection"}
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
        sectionTitle={"testSection"}
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
          sectionTitle={"testSection"}
        />
      )
      .toJSON();
    expect(slideshowContainer).toMatchSnapshot();
  });
});

describe("Slideshow tests", () => {
  beforeEach(() => {
    resizeWindow(1024);
  });
  it("shold pass axe accessibility test", async () => {
    const { container } = render(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it("should show only the next button upon rendering", () => {
    render(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    expect(screen.queryByRole("button", { name: />/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /</i })
    ).not.toBeInTheDocument();
  });
  it("should show the prev button ones the next button has been clicked", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    await user.click(screen.getByRole("button", { name: />/i }));
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
  });
  it("should hide the next button when the end of the list is reached", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    await user.click(screen.getByRole("button", { name: />/i }));
    await user.click(screen.getByRole("button", { name: />/i }));
    await user.click(screen.getByRole("button", { name: />/i }));
    //renders prev button
    expect(screen.getByRole("button", { name: /</i })).toBeInTheDocument();
    //does not render next button
    expect(
      screen.queryByRole("button", { name: />/i })
    ).not.toBeInTheDocument();
  });
  it("should support keyboard naviagtion", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );

    await user.tab();
    expect(screen.getByRole("link", { name: "Test" })).toHaveFocus();
    // To slide #one
    await user.tab();

    expect(screen.getByRole("link", { name: "Test 1" })).toHaveFocus();
    // To slide #two
    await user.tab();

    expect(screen.getByRole("link", { name: "Test 2" })).toHaveFocus();
    // Back to slide #one
    await user.tab({ shift: true });

    expect(screen.getByRole("link", { name: "Test 1" })).toHaveFocus();
    //   user.tab();
    //   user.tab();
    //   user.tab();
    //   // Last slide
    //   expect(screen.getByRole("link", { name: "Test 4" })).toHaveFocus();
    //   user.tab();
    //   // Can not pass last slide
    //   expect(screen.getByRole("link", { name: "Test 4" })).toHaveFocus();
  });
  it("should render buttons on tablet", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    resizeWindow(800);

    expect(screen.queryByRole("button", { name: />/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /</i })
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: />/i }));
    expect(screen.queryByRole("button", { name: /</i })).toBeInTheDocument();
  });
  it("should allow the user to swipe throught the slideshow on tablet", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    // Move slides to left
    await user.pointer([
      // touch the screen at element1
      {
        keys: "[TouchA>]",
        target: screen.getByTestId(/slideshow-card-test-id-2/i),
      },
      // move the touch pointer to element2
      {
        pointerName: "TouchA",
        target: screen.getByTestId(/slideshow-card-test-id-1/i),
      },
      // release the touch pointer at the last position (element2)
      { keys: "[/TouchA]" },
    ]);
    // Move sides to the right
    await user.pointer([
      // touch the screen at element1
      {
        keys: "[TouchA>]",
        target: screen.getByTestId(/slideshow-card-test-id-2/i),
      },
      // move the touch pointer to element2
      {
        pointerName: "TouchA",
        target: screen.getByTestId(/slideshow-card-test-id-3/i),
      },
      // release the touch pointer at the last position (element2)
      { keys: "[/TouchA]" },
    ]);
  });
  it("should render no buttons on mobile", () => {
    render(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    resizeWindow(600);
    expect(
      screen.queryByRole("button", { name: />/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /</i })
    ).not.toBeInTheDocument();
  });
  it("should allow the user to swipe throught the slideshow on mobile", async () => {
    const { user } = setup(
      <Slideshow
        id="slideshow-test-id"
        title="Test"
        link="https://nypl.com"
        items={items}
      />
    );
    // Move slides to the left
    await user.pointer([
      // touch the screen at element1
      {
        keys: "[TouchA>]",
        target: screen.getByTestId(/slideshow-card-test-id-2/i),
      },
      // move the touch pointer to element2
      {
        pointerName: "TouchA",
        target: screen.getByTestId(/slideshow-card-test-id-1/i),
      },
      // release the touch pointer at the last position (element2)
      { keys: "[/TouchA]" },
    ]);
    // Move sides to the right
    await user.pointer([
      // touch the screen at element1
      {
        keys: "[TouchA>]",
        target: screen.getByTestId(/slideshow-card-test-id-2/i),
      },
      // move the touch pointer to element2
      {
        pointerName: "TouchA",
        target: screen.getByTestId(/slideshow-card-test-id-3/i),
      },
      // release the touch pointer at the last position (element2)
      { keys: "[/TouchA]" },
    ]);
  });
  it("should render the UI snapshot correctly", () => {
    const desktopSlideshow = renderer
      .create(
        <Slideshow
          id="slideshow-test-id"
          title="Test"
          link="https://nypl.com"
          items={items}
        />
      )
      .toJSON();
    expect(desktopSlideshow).toMatchSnapshot();
  });
});
