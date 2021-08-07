import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  //Image
} from '@nypl/design-system-react-components';
import Link from 'next/link';
import Image from 'next/image';

function Card(props) {
  const { name, imageUrl, description, url } = props;

  return (
    <Fragment>
      {imageUrl &&
        <Image
          alt=""
          src={imageUrl}
          width={308}
          height={154}
          quality={10}
        />
      }
      {url &&
        <h3 className={'heading'}>
          <Link href={url}>
            <a>{name}</a>
          </Link>
        </h3>
      }
      <div dangerouslySetInnerHTML={{
          __html: description 
        }}>
      </div>
    </Fragment>
  );
};

export default Card;