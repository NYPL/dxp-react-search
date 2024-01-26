import * as React from "react";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import {
  Box,
  Heading,
  NewsletterSignup,
  NewsletterSignupViewType,
} from "@nypl/design-system-react-components";
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
  const [formState, setFormState] =
    React.useState<NewsletterSignupViewType>("confirmation");

  const [status, setStatus] = React.useState<StatusCode>();
  const { asPath } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create dynamic Google Analytics values.
    const gaEventCategory = "Email Subscription Forms";
    const gaEventActionName = `Subscribe - ${asPath}`; // example: Subscribe - /research
    const gaEventLabel = `Success ${salesforceSourceCode}`; // example: Success research

    setFormState("submitting");
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

        // Google Analytics.
        window.gtag("event", gaEventActionName, {
          event_category: gaEventCategory,
          event_label: gaEventLabel,
        });

        // Adobe Analytics.
        // Clear the data layer of previous values.
        window.adobeDataLayer.push({ event_data: null });

        // Push the new values from the click event.
        window.adobeDataLayer.push({
          event: "send_event",
          event_data: {
            name: "email_signup",
            serialization_id: null,
            platform: salesforceSourceCode,
            data_list: [salesforceListId],
          },
        });

        setStatus(result.statusCode);
        setFormState("confirmation");
      } catch (error) {
        setStatus("ERROR");
        setFormState("error");
        /* @TODO maybe it would be usful to submit a
        GA event with label "Error - ${salesforceSourceCode}"?*/
      }
    }
  };

  if (formState === "submitting") {
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
    <>
      <NewsletterSignup
        // id is not passed to the Newsletters outest div (aka Stack)
        // className also does not seem to be passed in any place
        id={id}
        // I as trying to overwrite the border color but does not work
        sx={{
          "div.chakra-stack::nth-child(2)": {
            borderLeftColor: "var(--nypl-colors-section-research-primary)",
          },
        }}
        confirmationHeading="Thank you!"
        confirmationText="You have successfully subscribed to our email updates! You can update your email subscription preferences at any time using the links at the bottom of the email."
        descriptionText={description}
        errorText={
          <Box
            dangerouslySetInnerHTML={{
              __html:
                "An error has occurred while attempting to save your information. Please refresh this page and try again. If this error persists, <a href='mailto:enews@nypl.org?subject=Please re-activate my e-mail address'>contact our e-mail team</a>.",
            }}
          />
        }
        formHelperText={
          <Box dangerouslySetInnerHTML={{ __html: formHelperText }} />
        }
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
        /** The placeholder is not editable but that might not be too bad
         * placeContent={formPlaceholder}
         */
        {...(heading && { title: <Heading level="h2">{heading}</Heading> })}
        valueEmail={input}
        // For now the "submitting" view is never shown since we have a check on line 112
        view={formState}
      />
      <EmailSubscriptionWrapper
        id={id}
        bgColor={bgColor}
        heading={heading}
        headingColor={headingColor}
      >
        {status ? (
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
    </>
  );
}
