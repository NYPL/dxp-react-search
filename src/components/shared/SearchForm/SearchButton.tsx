import React from "react";
// Components
import {
  Button,
  ButtonTypes,
  Icon,
  IconNames,
  IconSizes,
} from "@nypl/design-system-react-components";

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
      buttonType={ButtonTypes.Primary}
      mouseDown={false}
      type="submit"
      additionalStyles={{
        alignSelf: "flex-end",
      }}
    >
      <Icon
        align={IconAlign.Left}
        name={IconNames.Search}
        size={IconSizes.Medium}
      />
      Search
    </Button>
  );
}

export default SearchButton;
