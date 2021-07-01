import React, { useState, useEffect } from 'react';
// Components
import { Heading, TextInput, Button } from '@nypl/design-system-react-components';
// Styles
import s from './VerifyForm.module.css';
// Utils
import validateCardNumber from '../../../utils/luhnValidate';

function VerifyForm() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function verifyFormValidation(cardNumber) {
    const cardNumberStatus = validateCardNumber(cardNumber);
    console.log(cardNumberStatus);
    if (cardNumberStatus) {
      setError(false);
      console.log('Card Number is Valid. Let me in.');
    } else {
      setError(true);
    }
  }
  
  return (
    <>
    <div className={s.verify}>
      <Heading id="heading2" level={2} text="Login to use this database" />
      <TextInput 
        labelText={'Library Card Number'}
        placeholder={'Enter Library Card Number'}
        helperText={'Type all 14 digits of the number on the back of your library card. Do not use spaces.'}
        required={true}
        errorText={'Invalid card number. Make sure you type all 14 digits of the number on the back of your library card. Do not use spaces.'}
        errored={error}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button onClick={() => verifyFormValidation(input)}>
        Log in
      </Button>
      <p>Don't have a library card? <a href="https://www.nypl.org/library-card/new">Apply for a new one.</a></p>
    </div>
    </>
  );
};

export default VerifyForm;
