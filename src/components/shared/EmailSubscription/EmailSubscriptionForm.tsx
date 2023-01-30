import * as React from "react";
import {
  Button,
  Box,
  Form,
  FormField,
  FormRow,
  Text,
  TextInput,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components";

interface EmailSubscriptionFormProps {
  id: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: string) => void;
  formInput?: string;
  formPlaceholder?: string;
  formHelperText: string;
}

export default function EmailSubscriptionForm({
  id,
  description,
  onSubmit,
  onChange,
  formInput,
  formPlaceholder,
  formHelperText,
}: EmailSubscriptionFormProps): React.ReactElement {
  const { isLargerThanMobile } = useNYPLBreakpoints();

  return (
    <>
      <Text fontSize="1">{description}</Text>
      <Form
        id="email-subscription-form"
        onSubmit={(e) => onSubmit(e)}
        gap="grid.s"
        maxW="415px"
        w={{ base: "full" }}
      >
        <FormRow gridTemplateColumns={{ base: "repeat(1fr)", md: "2fr auto" }}>
          <FormField>
            <TextInput
              isRequired
              id={`email-input-${id}`}
              labelText="Email Address"
              value={formInput}
              type="email"
              name="email"
              showHelperInvalidText={isLargerThanMobile}
              textAlign="start"
              sx={{ div: { color: "ui.white" } }}
              placeholder={formPlaceholder}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </FormField>
          <FormField alignItems="end" pb={{ base: 0, md: "28%" }}>
            <Button
              id={`email-submit-button-${id}`}
              type="submit"
              borderColor="ui.white"
              color="ui.white"
              border="1px solid"
              bg="transparent"
            >
              Submit
            </Button>
          </FormField>
        </FormRow>
      </Form>
      <Box
        textDecoration="italic"
        mt="1rem"
        fontSize="-1"
        dangerouslySetInnerHTML={{ __html: formHelperText }}
        sx={{ a: { color: "ui.white", textDecoration: "underline" } }}
      />
    </>
  );
}
