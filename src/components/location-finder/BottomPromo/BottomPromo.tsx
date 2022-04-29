import React from "react";
// Content
import BottomPromoContent from "./content";
// Components
import {
  Heading,
  Image,
  Link,
  Logo,
  LogoNames,
} from "@nypl/design-system-react-components";

function BottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <div className="bottom-promo">
      <div className="row">
        <div className="column left">
          <Heading
            id="promo-left-section-title"
            level="two"
            text={promo_left.title}
          />
          {promo_left.image.map((value) => {
            return (
              <div key={value.link} className="promo-card">
                <Link href={value.link} className="promo-link">
                  <Image alt="" caption={value.name} src={value.url} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="column right">
          <Heading
            id="promo-right-section-title"
            level="two"
            text={promo_right.title}
          />
          <p className="promo-description">{promo_right.description}</p>
          {promo_right.image.map((value) => {
            return (
              <div key={value.link} className="promo-card promo-card-with-icon">
                <Link type="default">
                  <a
                    aria-label={value.logo_alt}
                    href={value.link}
                    className="promo-link"
                  >
                    <Logo name={value.logo as LogoNames} size="small" />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BottomPromo;
