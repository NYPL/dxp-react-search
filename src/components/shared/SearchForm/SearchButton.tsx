import React from "react";
// Components
import { Button, Icon } from "@nypl/design-system-react-components";

// @TODO this should be properly exported from DS.
enum IconAlign {
  Left = "left",
  Right = "right",
  None = "none",
}

function SearchButton({ id }: { id: string }) {
  return (
    <Button
      id={id}
      buttonType="primary"
      mouseDown={false}
      type="submit"
      // additionalStyles
      sx={{
        alignSelf: "flex-end",
      }}
    >
      <Icon align="left" name="search" size="medium" />
      Search
    </Button>
  );
}

export default SearchButton;
