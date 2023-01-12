import * as React from "react";
import {
  Button,
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
  formHelperText?: string;
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
      <Text fontSize="1" w={{ base: "100%", lg: "85%" }}>
        {description}
      </Text>
      <Form
        id="email-subscription-form"
        onSubmit={(e) => onSubmit(e)}
        gap="grid.s"
        maxW="415px"
        w={{ base: "full", md: "60%", lg: "40%" }}
      >
        <FormRow gridTemplateColumns={{ base: "repeat(1fr)", md: "2fr auto" }}>
          <FormField>
            <TextInput
              id={`email-input-${id}`}
              labelText="Email subscription"
              value={formInput}
              type="email"
              name="email"
              color="black"
              showHelperInvalidText={isLargerThanMobile}
              textAlign="start"
              sx={{ div: { color: "ui.white" } }}
              placeholder={formPlaceholder}
              showLabel={false}
              onChange={(e) => {
                onChange(e.target.value);
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
  );
}
