import * as React from "react";

const useSetFocus = (
  ref: React.RefObject<any>,
  itemLabel: string,
  activeItemTitle?: string,
  isOpen = false
) => {
  React.useEffect(() => {
    if (activeItemTitle === itemLabel && isOpen) {
      ref.current?.focus();
    }
  }, [isOpen, activeItemTitle]);
};

export default useSetFocus;
