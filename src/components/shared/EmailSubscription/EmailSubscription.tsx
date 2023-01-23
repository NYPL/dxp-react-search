import * as React from "react";
import { useRouter } from "next/router";
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
  salesforceSourceCode: string;
}

export default function EmailSubscription({
  id,
  heading,
  description,
  headingColor = "ui.white",
  // @TODO confirm with UX what the default color should be
  bgColor = "section.research.primary",
  // @TODO should this even be a prop? I imagine this will be the same for all newsletters?
  formBaseUrl = "/api/salesforce",
  formHelperText = "*You will receive email updates from the Library, and you will be able to unsubscribe at any time. To learn more about how the Library uses information you provide, please read our <a target='_blank' rel='noopener noreferrer' href='https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy'>privacy policy</a>.",
  formPlaceholder,
  salesforceSourceCode,
  salesforceListId,
}: EmailSubscriptionProps): JSX.Element {
  const [input, setInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [status, setStatus] = React.useState<StatusCode>();

  //Create dynamic Google Analytics values
  const gaEventCategory = "Email Subscription Forms";
  const { asPath } = useRouter();
  const gaEventActionName = `Subscribe - ${asPath}`; // example: Subscribe - /research
  const gaEventLabel = `Success ${salesforceSourceCode.replace(
    /(\b[a-z](?!\s))/g,
    function (firstLetter) {
      return firstLetter.toUpperCase();
    }
  )}`;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // @ts-ignore
    window.gtag("event", gaEventActionName, {
      event_category: gaEventCategory,
      event_label: gaEventLabel,
    });

    setIsSubmitting(true);
    if (formBaseUrl !== undefined) {
      // API endpoint where we send form data.
      const endpoint = `${formBaseUrl}`;
      // Form the request for sending data to the server.
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          list_id: salesforceListId,
          source_code: salesforceSourceCode,
        }),
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
