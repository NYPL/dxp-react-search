import React, { useContext } from "react";
import {
  Heading,
  Notification,
  NotificationContent,
  NotificationTypes,
} from "@nypl/design-system-react-components";
import { FormContext } from "./../../../context/FormContext";

function RequestVisitFormError() {
  // @ts-ignore
  const [state, dispatch] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  if (isSubmitted && !state.isValid && Object.keys(state.errors).length > 0) {
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
            <strong>
              There was a problem with your submissions. Errors have been
              highlighted below.
            </strong>
          </NotificationContent>
        </Notification>
      </div>
    );
  }

  return null;
}

export default RequestVisitFormError;

/*
      {isSubmitted &&
        !state.isValid &&
        Object.keys(state.errors).length > 0 && (
          <div>
            There was a problem with your submissions. Errors have been
            highlighted below.
          </div>
        )}

*/
