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

type ApiResponse = {
  statusCode: StatusCode;
  formData?: Record<any, any>;
  statusMessage?: string;
};
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
const EmailSubscription = ({
  id,
  heading,
  description,
  headingColor = "ui.white",
  // @TODO confirm with UX what the default color should be
  bgColor = "section.research.primary",
  // @TODO should this even be a prop? I imagine this will be the same for all newsletters?
  formBaseUrl = "/api/salesforce?email",
  // @TODO formHelperText might be hardcoded for all Subscriptions
  formHelperText = "* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  formPlaceholder,
  salesforceListId,
}: EmailSubscriptionProps): JSX.Element => {
  const [input, setInput] = React.useState("");
  const [apiResponse, setApiResponse] = React.useState<ApiResponse | null>(
    null
  );
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
      const response = await fetch(endpoint, options);
      const result = await response.json();
      setApiResponse(result);
      console.log("submit", result);
    }
  };
  const getApiResponse = ({
    statusCode,
    statusMessage,
    formData,
  }: ApiResponse) => (
    <Box w="full">
      <Icon
        decorative
        size="large"
        name={iconTable[statusCode]}
        color={bgColor}
        bgColor={headingColor}
        borderRadius="50%"
      />
      <Text alignSelf="center" textAlign="center" marginStart="s" mb="0">
        {`${statusMessage} ${formData?.email}`}
      </Text>
    </Box>
  );

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
      {apiResponse?.statusCode ? (
        getApiResponse(apiResponse)
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
};

export default EmailSubscription;
