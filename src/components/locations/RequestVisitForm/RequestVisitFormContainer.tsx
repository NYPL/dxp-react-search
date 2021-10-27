import React from "react";
import { FormContextProvider } from "./../../../context/FormContext";
import { Heading } from "@nypl/design-system-react-components";
import RequestVisitForm from "./RequestVisitForm";

function RequestVisitFormContainer() {
  return (
    <FormContextProvider>
      <Heading
        className="request-visit__header"
        level={1}
        text="Request a Group Visit"
      />
      <p className="request-visit__description">
        Volutpat tristique curabitur sapien non etiam fringilla magna luctus
        eros, condimentum suscipit dictum nascetur ullamcorper purus nec risus
        elit, eleifend mollis fames.
      </p>
      <RequestVisitForm />
    </FormContextProvider>
  );
}

export default RequestVisitFormContainer;
