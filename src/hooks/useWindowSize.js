import { useState, useEffect } from "react";

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? window.innerWidth : undefined
  );

  useEffect(() => {
    // Handler called on change of the screen resize
    function setSize() {
      setWindowSize(window.innerWidth);
    }

    if (isWindowClient) {
      // Add the window resize listener
      window.addEventListener("resize", setSize);

      // Remove the listener
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

export default useWindowSize;
