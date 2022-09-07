import { defaultFallbackInView } from "react-intersection-observer";

global.IntersectionObserver = jest.fn();
defaultFallbackInView(false);
