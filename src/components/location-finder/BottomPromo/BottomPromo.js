import React from 'react';
// Content
import BottomPromoContent from './content';
// Components
import * as DS from '@nypl/design-system-react-components';

function BottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <div className='bottom-promo'>
      <div className='row'>
        <div className='column left'>
          <DS.Heading
            id="promo-left-section-title"
            level={2}
            text={promo_left.title}
          />
          {promo_left.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card">
                <DS.Link
                  href={value.link}
                  className="promo-link"
                >
                  <DS.Image
                    alt=""
                    imageCaption={value.name}
                    imageCredit={null}
                    modifiers={null}
                    src={value.url}
                  />
                </DS.Link>
              </div>
            );
          })}
        </div>
        <div className='column right'>
          <DS.Heading
            id="promo-right-section-title"
            level={2}
            text={promo_right.title}
          />
          <p className="promo-description">
            {promo_right.description}
          </p>
          {promo_right.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card promo-card-with-icon">
                <DS.Link type="default">
                  <a
                    aria-label={value.logo_alt}
                    href={value.link}
                    className="promo-link"
                  >
                    <DS.Icon decorative name={value.logo} />
                  </a>
                </DS.Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BottomPromo;
