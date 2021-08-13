import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  //Image
} from '@nypl/design-system-react-components';
import Link from 'next/link';
import Image from 'next/image';

function Card(props) {
  const { children } = props;

  return (
    <div className='ds-prototype-card'>
      {children}
    </div>
  );
};

export default Card;