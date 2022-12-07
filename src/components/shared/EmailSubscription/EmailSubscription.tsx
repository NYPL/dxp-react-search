import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  TextInput,
} from "@nypl/design-system-react-components";

interface EmailSubscriptionProps {
  id?: string;
  title?: string;
  description?: string;
  headingColor: string;
  formBaseUrl?: string;
  formHelperText?: string;
  formPlaceholder?: string;
}
const EmailSubscription = ({
  id,
  title,
  description,
  headingColor,
  formBaseUrl,
  formHelperText,
  formPlaceholder,
}: EmailSubscriptionProps): JSX.Element => {
  const [input, setInput] = React.useState("");
  const onSubmit = () => {
    if (formBaseUrl !== undefined) {
      window.location.href = `${formBaseUrl}/search?q=${input}`;
    }
  };
  return (
    <Box
      id={id}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      height="360px"
      bgColor="section.research.primary"
      color={headingColor}
      textAlign="center"
    >
      <Heading text={title} w={{ base: "90%", md: "70%" }} />
      <Text fontSize="1" w={{ base: "80%", md: "60%" }}>
        {description}
      </Text>
      <Box
        display="grid"
        gridTemplateColumns="2fr auto"
        gridColumnGap={2}
        justifyContent="center"
        alignItems="center"
        w={{ base: "70%", md: "50%", lg: "35%" }}
      >
        <TextInput
          id={`${id}-text-input`}
          labelText="Email subscription"
          value={input}
          color="black"
          placeholder={formPlaceholder}
          showLabel={false}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          id={`emails-submit-button-${id}`}
          height="full"
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
      <Text isItalic mt="1rem" fontSize="-1">
        {formHelperText}
      </Text>
    </Box>
  );
};

export default EmailSubscription;
