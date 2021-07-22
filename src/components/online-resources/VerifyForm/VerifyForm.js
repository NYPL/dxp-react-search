import React, { useState, useEffect } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import { Heading, TextInput, Button } from '@nypl/design-system-react-components';
// Apollo
//import { useQuery } from '@apollo/client';
import { useApolloClient, useQuery } from '@apollo/client';
import {
  OnlineResourceByIdQuery as ONLINE_RESOURCE_BY_ID_QUERY
} from './../../../apollo/client/queries/OnlineResourceById.gql';
import {
  ValidatePatronCardQuery as VALIDATE_PATRON_CARD_QUERY
} from './../../../apollo/client/queries/ValidatePatronCard.gql';
// Styles
import s from './VerifyForm.module.css';
// Utils
import validateCardNumber from '../../../utils/luhnValidate';

function VerifyForm() {
  const router = useRouter();
  const client = useApolloClient();

  // Local state
  const [input, setInput] = useState('');
  const [formError, setFormError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Query to validate the patron card.
    client.query({ 
      query: VALIDATE_PATRON_CARD_QUERY,
      variables: {
        barcode: input,
        pin: '1234'
      }
    }).then(
      response => {
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
      error => {
        setFormError(true);
      }
    );
  }

  const resourceUuid = router.query.uuid ? router.query.uuid : null;
  // Query for the online resource, to get the redirect url.
  const { loading, error, data } = useQuery(
    ONLINE_RESOURCE_BY_ID_QUERY, {
      skip: !resourceUuid,
      variables: {
        id: resourceUuid
      }
    }
  );
  const redirectUrl = data?.searchDocument?.resourceUrl;

  if (error) {
    return (
      <div>Error while loading ...</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div>Loading ...</div>
    );
  }
  
  return (
    <>
    <div className={s.verify}>
      <Heading id="heading2" level={2} text="Login to use this database" />
      <form
        id={'online-resources-verify-form'}
        role='search'
        aria-label='Aria Label'
        onSubmit={handleSubmit}
      >
        <TextInput 
          labelText={'Library Card Number'}
          placeholder={'Enter Library Card Number'}
          helperText={'Type all 14 digits of the number on the back of your library card. Do not use spaces.'}
          required={true}
          errorText={'Invalid card number. Make sure you type all 14 digits of the number on the back of your library card. Do not use spaces.'}
          errored={formError}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button>
          Log in
        </Button>
      </form>
      <p>Don't have a library card? <a href="https://www.nypl.org/library-card/new">Apply for a new one.</a></p>
    </div>
    </>
  );
};

export default VerifyForm;