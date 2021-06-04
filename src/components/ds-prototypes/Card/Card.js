import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  Image
} from '@nypl/design-system-react-components';
import Link from 'next/link';


function Card(props) {
  const { name, imageUrl, description, url } = props;

  return (
    <Fragment>
      {imageUrl &&
        <Image
          alt=""
          src={imageUrl}
        />
      }
      {url &&
        <Link href={url}>
          <a>
            <Heading
              level={3}
              text={name}
            />
          </a>
        </Link>
      }
      <div dangerouslySetInnerHTML={{
          __html: description 
        }}>
      </div>
    </Fragment>
  );
};

export default Card;