import * as React from "react";
import { Spinner } from "@chakra-ui/react";

import EmailSubscriptionWrapper from "./EmaiSubscriptionWrapper";
import EmailSubscriptionForm from "./EmailSubscriptionForm";
import EmailSubscriptionConfirmation, {
  StatusCode,
} from "./EmailSubscriptionConfirmation";

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [status, setStatus] = React.useState<StatusCode>();
  // @TDOD Replace this hard coded string with a dynamic value TBD
  const sourceCode = "Scout Test Source Code";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formBaseUrl !== undefined) {
      // API endpoint where we send form data.
      const endpoint = `${formBaseUrl}=${e.target.email.value}&list_id=${salesforceListId}&source_code=${sourceCode}`;
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
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <EmailSubscriptionWrapper
        id={id}
        bgColor={bgColor}
        heading={heading}
        headingColor={headingColor}
      >
        <Spinner size="lg" speed="0.65s" />
      </EmailSubscriptionWrapper>
    );
  }

  if (isSubmitted && status) {
    return (
      <EmailSubscriptionWrapper
        id={id}
        bgColor={bgColor}
        heading={heading}
        headingColor={headingColor}
      >
        <EmailSubscriptionConfirmation
          status={status}
          bgColor={bgColor}
          headingColor={headingColor}
        ></EmailSubscriptionConfirmation>
      </EmailSubscriptionWrapper>
    );
  }

  return (
    <EmailSubscriptionWrapper
      id={id}
      bgColor={bgColor}
      heading={heading}
      headingColor={headingColor}
    >
      <EmailSubscriptionForm
        id={id}
        description={description}
        onSubmit={handleSubmit}
        onChange={setInput}
        formInput={input}
        formPlaceholder={formPlaceholder}
        formHelperText={formHelperText}
      ></EmailSubscriptionForm>
    </EmailSubscriptionWrapper>
  );
}
