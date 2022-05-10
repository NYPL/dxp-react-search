import React from "react";
// Content
import BottomPromoContent from "../../../__content/locationFinder";
// Components
import {
  Heading,
  Image,
  Link,
  Logo,
  LogoNames,
  Text,
} from "@nypl/design-system-react-components";
import TestBottomPromo from "./TestBottomPromo";

function BottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <>
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
            <Text size="caption">{promo_right.description}</Text>
            {promo_right.image.map((value) => {
              return (
                <div
                  key={value.link}
                  className="promo-card promo-card-with-icon"
                >
                  <Link type="default">
                    <a
                      aria-label={value.logo_alt}
                      href={value.link}
                      className="promo-link"
                    >
                      <Logo
                        // @ts-ignore
                        name={value.logo as LogoNames}
                        size="small"
                      />
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <TestBottomPromo />
    </>
  );
}

export default BottomPromo;
