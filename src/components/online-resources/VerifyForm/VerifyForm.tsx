import React, { useState } from "react";
// Next
import { useRouter } from "next/router";
// Components
import {
  Heading,
  TextInput,
  Button,
} from "@nypl/design-system-react-components";
// Apollo
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { ONLINE_RESOURCE_BY_ID_QUERY } from "./../../../pages/research/collections/articles-databases/[slug]";
// Styles
import s from "./VerifyForm.module.css";
// Utils

const VALIDATE_PATRON_CARD_QUERY = gql`
  query ValidatePatronCardQuery($barcode: String, $pin: String) {
    validatePatronCard(barcode: $barcode, pin: $pin) {
      id
      valid
      message
    }
  }
`;

function VerifyForm() {
  const router = useRouter();
  const client = useApolloClient();

  // Local state
  const [input, setInput] = useState("");
  const [formError, setFormError] = useState(false);

  const resourceUuid = router.query.uuid ? router.query.uuid : null;
  // Query for the online resource, to get the redirect url.
  const { loading, error, data } = useQuery(ONLINE_RESOURCE_BY_ID_QUERY, {
    skip: !resourceUuid,
    variables: {
      id: resourceUuid,
    },
  });

  const redirectUrl = data?.searchDocument?.resourceUrl;

  if (error) {
    return <div>Error while loading ...</div>;
  }

  // Loading state.
  // @TODO add loading skeleton.
  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    // Query to validate the patron card.
    client
      .query({
        query: VALIDATE_PATRON_CARD_QUERY,
        variables: {
          barcode: input,
          pin: "1234",
        },
      })
      .then(
        (response) => {
          // Check if api response is a valid card.
          const isCardValid = response.data.validatePatronCard.valid;
          if (isCardValid === false) {
            setFormError(true);
          } else {
            setFormError(false);
            // Redirect to the external url
            window.location.href = redirectUrl;
          }
        },
        (error) => {
          console.error(error);
          setFormError(true);
        }
      );
  }

  return (
    <div className={s.verify}>
      <Heading id="heading2" level="two" text="Login to use this database" />
      <form
        id="online-resources-verify-form"
        role="search"
        aria-label="Aria Label"
        onSubmit={handleSubmit}
      >
        <TextInput
          id="verify-form-login-input"
          labelText={"Library Card Number"}
          placeholder={"Enter Library Card Number"}
          helperText={
            "Type all 14 digits of the number on the back of your library card. Do not use spaces."
          }
          isRequired={true}
          invalidText={
            "Invalid card number. Make sure you type all 14 digits of the number on the back of your library card. Do not use spaces."
          }
          isInvalid={formError}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button id="verify-form-login-button" type="submit">
          Log in
        </Button>
      </form>
      <p>
        Don't have a library card?&nbsp;
        <a href="https://www.nypl.org/library-card/new">Apply for a new one.</a>
      </p>
    </div>
  );
}

export default VerifyForm;
