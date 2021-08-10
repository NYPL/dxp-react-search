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
        <div className='image-container'>
          <Image
            className="image"
            alt=""
            src={imageUrl}
            /*width={308}
            height={154}
            */
            layout="fill"
            quality={10}
          />
        </div>
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