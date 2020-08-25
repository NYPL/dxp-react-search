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
          <DS.SectionTitle
            headingText={promo_left.title}
            id="promo-left-section-title"
          />
          {promo_left.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card">
                <DS.Link
                  href={value.link}
                  className="promo-link"
                >
                  <DS.Image
                    altText={value.name}
                    imageCaption={value.name}
                    imageCredit={null}
                    isDecorative
                    modifiers={null}
                    src={value.url}
                  />
                </DS.Link>
              </div>
            );
          })}
        </div>
        <div className='column right'>
          <DS.SectionTitle
            headingText={promo_right.title}
            id="promo-right-section-title"
          />
          <p className="promo-description">
            {promo_right.description}
          </p>
          {promo_right.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card promo-card-with-icon">
                <DS.Link
                  aria-label={value.logo_alt}
                  href={value.link}
                  className="promo-link"
                >
                  <DS.Icon decorative name={value.logo} />
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
