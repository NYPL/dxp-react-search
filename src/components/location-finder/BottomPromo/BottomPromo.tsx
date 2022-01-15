import React from "react";
// Content
import BottomPromoContent from "./content";
// Components
import {
  Heading,
  HeadingLevels,
  Icon,
  IconSizes,
  Image,
  Link,
  LinkTypes,
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
            level={HeadingLevels.Two}
            text={promo_left.title}
          />
          {promo_left.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card">
                <Link href={value.link} className="promo-link">
                  <Image alt="" imageCaption={value.name} src={value.url} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="column right">
          <Heading
            id="promo-right-section-title"
            level={HeadingLevels.Two}
            text={promo_right.title}
          />
          <p className="promo-description">{promo_right.description}</p>
          {promo_right.image.map((value, index) => {
            return (
              <div key={value.link} className="promo-card promo-card-with-icon">
                <Link type={LinkTypes.Default}>
                  <a
                    aria-label={value.logo_alt}
                    href={value.link}
                    className="promo-link"
                  >
                    <Icon
                      size={IconSizes.ExtraExtraExtraLarge}
                      // @ts-ignore
                      name={LogoNames[value.logo]}
                    />
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