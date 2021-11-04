import React, { useContext } from "react";
import {
  Notification,
  NotificationContent,
  NotificationTypes,
} from "@nypl/design-system-react-components";
import { FormContext } from "./../../../context/FormContext";

function RequestVisitFormError() {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted, serverError } = state;

  let message =
    "There was a problem with your submissions. Errors have been highlighted below.";

  if (serverError) {
    message =
      "There was a problem submitting the form. Please send your request to gethelp@nypl.org";
  }

  if (
    serverError ||
    (isSubmitted && !state.isValid && Object.keys(state.errors).length > 0)
  ) {
    return (
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Notification notificationType={NotificationTypes.Warning}>
          <NotificationContent>
            <strong>{message}</strong>
          </NotificationContent>
        </Notification>
      </div>
    );
  }

  return null;
}

export default RequestVisitFormError;
