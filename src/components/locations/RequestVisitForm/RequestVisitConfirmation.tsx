import React from "react";
import { Heading } from "@nypl/design-system-react-components";

function RequestVisitConfirmation() {
  return (
    <div>
      <Heading className="request-visit__header" level={2} text="Thank You!" />
      <p>
        We've recieved your request and will get back to you within 48 hours.
      </p>
    </div>
  );
}

export default RequestVisitConfirmation;
