// Fixes the next/img relates test error messages, resource: https://www.benmvp.com/blog/avoiding-react-act-warning-when-accessibility-testing-next-link-jest-axe/
import { defaultFallbackInView } from "react-intersection-observer";

global.IntersectionObserver = jest.fn();
defaultFallbackInView(false);
