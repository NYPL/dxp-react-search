import * as React from "react";
import { Spinner } from "@chakra-ui/react";
import EmailSubscriptionWrapper from "./EmailSubscriptionWrapper";
import EmailSubscriptionForm from "./EmailSubscriptionForm";
import EmailSubscriptionConfirmation, {
  StatusCode,
} from "./EmailSubscriptionConfirmation";

interface EmailSubscriptionProps {
  id: string;
  heading?: string;
  description?: string;
  headingColor: string;
  bgColor?: string;
  formBaseUrl?: string;
  formHelperText?: string;
  formPlaceholder?: string;
  salesforceListId?: number;
  sourceCode?: string;
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
  // @TODO should there be a fall back value?
  sourceCode,
  salesforceListId,
}: EmailSubscriptionProps): JSX.Element {
  const [input, setInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [status, setStatus] = React.useState<StatusCode>();

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

  return (
    <EmailSubscriptionWrapper
      id={id}
      bgColor={bgColor}
      heading={heading}
      headingColor={headingColor}
    >
      {isSubmitted && status ? (
        <EmailSubscriptionConfirmation
          id={id}
          status={status}
          bgColor={bgColor}
          headingColor={headingColor}
        />
      ) : (
        <EmailSubscriptionForm
          id={id}
          description={description}
          onSubmit={handleSubmit}
          onChange={setInput}
          formInput={input}
          formPlaceholder={formPlaceholder}
          formHelperText={formHelperText}
        />
      )}
    </EmailSubscriptionWrapper>
  );
}
