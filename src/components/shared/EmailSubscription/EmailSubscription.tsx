import * as React from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  FormRow,
  Heading,
  Icon,
  IconNames,
  Text,
  TextInput,
} from "@nypl/design-system-react-components";

type StatusCode = "SUCCESS" | "ERROR" | "TEST_MODE";

interface EmailSubscriptionProps {
  id?: string;
  heading?: string;
  description?: string;
  headingColor: string;
  bgColor?: string;
  formBaseUrl?: string;
  formHelperText?: string;
  formPlaceholder?: string;
  salesforceListId?: number;
}

const iconTable: Record<StatusCode, IconNames> = {
  SUCCESS: "check",
  TEST_MODE: "speakerNotes",
  ERROR: "errorOutline",
};

export default function EmailSubscription({
  id,
  heading,
  description,
  headingColor = "ui.white",
  // @TODO confirm with UX what the default color should be
  bgColor = "section.research.primary",
  // @TODO should this even be a prop? I imagine this will be the same for all newsletters?
  formBaseUrl = "/api/salesforce?email",
  // @TODO formHelperText might be hardcoded for all Subscriptions
  formHelperText = "*To learn more about how the Library uses information you provide, please read our privacy and policy",
  formPlaceholder,
  salesforceListId,
}: EmailSubscriptionProps): JSX.Element {
  const [input, setInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<StatusCode>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formBaseUrl !== undefined) {
      // API endpoint where we send form data.
      const endpoint = `${formBaseUrl}=${e.target.email.value}&list_id=${salesforceListId}`;
      // Form the request for sending data to the server.
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send the form and await response.
      try {
        const response = await fetch(endpoint, options);
        const result = await response.json();
        setStatus(result.statusCode);
        setIsSubmitted(true);
      } catch (error) {
        setStatus("ERROR");
        setIsSubmitted(true);
      }
    }
  };

  function getStatusMessage(status: StatusCode) {
    if (status === "SUCCESS") {
      return "Success message to go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit";
    }
    if (status === "ERROR") {
      return "Error message to go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit";
    }
    if (status === "TEST_MODE") {
      return "Test mode ....";
    }
  }

  return (
    <Box
      id={`email-subscription-${id}`}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      padding="l"
      bgColor={bgColor}
      color={headingColor}
      textAlign="center"
      marginY="m"
    >
      <Heading text={heading} w={{ base: "90%", md: "70%" }} />
      {isSubmitted && status ? (
        <Box w="full">
          <Icon
            decorative
            size="large"
            name={iconTable[status]}
            color={bgColor}
            bgColor={headingColor}
            borderRadius="50%"
          />
          <Text alignSelf="center" textAlign="center" marginStart="s" mb="0">
            {getStatusMessage(status)}
          </Text>
        </Box>
      ) : (
        <>
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
            <FormRow
              gridTemplateColumns={{ base: "repeat(1fr)", md: "2fr auto" }}
            >
              <FormField>
                <TextInput
                  id={`email-input-${id}`}
                  labelText="Email subscription"
                  value={input}
                  type="email"
                  name="email"
                  color="black"
                  sx={{ div: { color: "ui.white" } }}
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
        </>
      )}
    </Box>
  );
}
