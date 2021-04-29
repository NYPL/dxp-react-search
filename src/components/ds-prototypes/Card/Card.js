import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  Image,
  Link,
  List,
  SkeletonLoader 
} from '@nypl/design-system-react-components';

function Card(props) {
  const { name, imageUrl, description } = props;

  return (
    <Fragment>
      {imageUrl &&
        <Image
          alt=""
          imageCredit={null}
          modifiers={null}
          src={imageUrl}
        />
      }
      <Heading
        level={3}
        text={name}
      />
      <div dangerouslySetInnerHTML={{
          __html: description 
        }}>
      </div>
    </Fragment>
  );
};

export default Card;
