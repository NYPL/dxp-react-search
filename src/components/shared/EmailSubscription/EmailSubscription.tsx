import * as React from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  FormRow,
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
  subscriptionListId?: number;
}
const EmailSubscription = ({
  id,
  title,
  description,
  headingColor,
  formBaseUrl,
  formHelperText,
  formPlaceholder,
  subscriptionListId,
}: EmailSubscriptionProps): JSX.Element => {
  const [input, setInput] = React.useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formBaseUrl !== undefined) {
      // API endpoint where we send form data.
      const endpoint = `${formBaseUrl}=${e.target.email.value}&list_id=${subscriptionListId}`;

      // Form the request for sending data to the server.
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send the form and await response.
      const response = await fetch(endpoint, options);
      const result = await response.json();

      console.log("submit", result);
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
      // height="360px"
      padding="l"
      bgColor="section.research.primary"
      color={headingColor}
      textAlign="center"
      marginY="m"
    >
      <Heading text={title} w={{ base: "90%", md: "70%" }} />
      <Text fontSize="1" w={{ base: "100%", lg: "85%" }}>
        {description}
      </Text>
      <Form
        id="email-subscription-form"
        onSubmit={(e) => handleSubmit(e)}
        gap="grid.s"
        maxW="415px"
        w={{ base: "full", md: "60%", lg: "40%" }}
      >
        <FormRow gridTemplateColumns={{ base: "2fr auto" }}>
          <FormField>
            <TextInput
              id={`email-input-${id}`}
              labelText="Email subscription"
              showHelperInvalidText={false}
              value={input}
              type="email"
              name="email"
              color="black"
              placeholder={formPlaceholder}
              showLabel={false}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </FormField>
          <FormField>
            <Button id={`email-submit-button-${id}`} type="submit">
              Submit
            </Button>
          </FormField>
        </FormRow>
      </Form>
      <Text isItalic mt="1rem" fontSize="-1">
        {formHelperText}
      </Text>
    </Box>
  );
};

export default EmailSubscription;
