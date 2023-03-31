import React, { useContext } from "react";
import { Notification } from "@nypl/design-system-react-components";
import { FormContext } from "./../../../context/FormContext";

function RequestVisitFormError() {
  const [state] = useContext(FormContext);
  const { isSubmitted, serverError, errors = {} } = state;

  let message =
    "There was a problem with your submissions. Errors have been highlighted below.";

  if (serverError) {
    message =
      "There was a problem submitting the form. Please send your request to gethelp@nypl.org";
  }

  if (
    serverError ||
    (isSubmitted && !state.isValid && Object.keys(errors).length > 0)
  ) {
    return (
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
        }}
        role="alert"
      >
        <Notification
          notificationType="warning"
          notificationContent={<strong>{message}</strong>}
        />
      </div>
    );
  }

  return null;
}

export default RequestVisitFormError;
