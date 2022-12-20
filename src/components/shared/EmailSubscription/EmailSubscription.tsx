import * as React from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  FormRow,
  Heading,
  Icon,
  Text,
  TextInput,
} from "@nypl/design-system-react-components";

type ApiResponse = {
  statusCode: string;
  formData?: Record<any, any>;
  statusMessage?: string;
};
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
  const [apiResponse, setApiResponse] = React.useState<ApiResponse | null>(
    null
  );
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
        size="xlarge"
        name={statusCode === "SUCCESS" ? "check" : "errorOutline"}
        color={headingColor}
      />
      <Text alignSelf="center" textAlign="center" marginStart="s" mb="0">
        {`${statusMessage} ${formData?.email}`}
      </Text>
    </Box>
  );

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
        </>
      )}
    </Box>
  );
};

export default EmailSubscription;
