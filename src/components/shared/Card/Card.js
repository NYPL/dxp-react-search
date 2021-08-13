import React from 'react';
// Components
import { default as DsCard } from './../../ds-prototypes/Card';
// Next components
import Link from 'next/link';
import Image from 'next/image';

function Card({ id, image, url, name, description }) {
  // Get the image transformation value.
  function getImageTransformation(id, image) {
    let imageUri;
    image.transformations.map(transformation => {
      if (transformation.label === id) {
        imageUri = transformation.uri;
      }
    });
    return imageUri;
  }

  return (
    <>
      <DsCard id={id}>
        {image &&
          <Image
            alt=""
            src={getImageTransformation('2_1_960', image)}
            layout="responsive"
            width={900}
            height={450}
            quality={90}
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
      </DsCard>
    </>
  );
};

export default Card;