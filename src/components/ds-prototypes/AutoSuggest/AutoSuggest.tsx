import React from "react";
import { Box, TextInput } from "@nypl/design-system-react-components";
import { useCombobox } from "downshift";
import { styles } from "./autoSuggestStyles";

export interface AutoSuggestProps {
  id: string;
  labelText: string;
  items: any;
  onChange: any;
  placeholder: string;
  suggestionsToShow: number;
  selectedItem: any;
  handleSelectedItemChange: any;
}

function AutoSuggest({
  id,
  labelText,
  items,
  onChange,
  placeholder,
  suggestionsToShow,
  selectedItem,
  handleSelectedItemChange,
}: AutoSuggestProps) {
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: items,
    onInputValueChange: onChange,
    selectedItem: selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
  });

  return (
    <Box id={id} __css={styles.baseStyle}>
      <Box {...getComboboxProps()}>
        <label {...getLabelProps()}>{labelText}</label>
        <TextInput
          {...getInputProps()}
          id="ds-autosuggest__text-input"
          labelText={labelText}
          showLabel={false}
          placeholder={placeholder}
          showOptReqLabel={false}
          additionalStyles={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        as="ul"
        listStyleType="none"
        marginInlineStart="0px"
        __css={isOpen ? styles.menuContainer : { display: "none" }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.slice(0, suggestionsToShow).map((item: any, index: any) => (
            <Box
              as="li"
              __css={styles.menuItem}
              {...getItemProps({ key: item, item, index })}
              // @TODO Keyboard navigation doesn't hightlight item?
              sx={highlightedIndex === index ? { backgroundColor: "#ddd" } : {}}
            >
              {item}
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default AutoSuggest;
