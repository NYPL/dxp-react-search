import * as React from "react";
import {
  Heading,
  Text,
  HorizontalRule,
} from "@nypl/design-system-react-components";

interface DonorCreditProps {
  id: string;
  showBorder: boolean;
  heading?: string;
}

function DonorCredit({ id }: DonorCreditProps) {
  return (
    <>
      <HorizontalRule />
      <Heading text="Donate asdfa sdfasdfas dfa" level="three" id={id} />
      <Text>asdf</Text>
    </>
  );
}

export default DonorCredit;
