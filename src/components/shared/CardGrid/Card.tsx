import * as React from "react";
import {
  Box,
  Card as DsCard,
  CardContent,
  CardHeading,
  Flex,
  LayoutTypes,
  Link,
} from "@nypl/design-system-react-components";
import ButtonLink from "./../ButtonLink";
import { ButtonLinkProps as ButtonLinkType } from "./../ButtonLink/ButtonLink";

export interface CardProps {
  /** The id for the card. */
  id: string;
  /** The heading text for the card's h3. */
  heading: string;
  /** The sub heading component for the card. */
  subHeading?: JSX.Element;
  /** The description for the card. */
  description?: string;
  /** The url for the card. */
  href: string;
  /** An optional image component that can be passed to the card. */
  image?: JSX.Element;
  /** An optional set of button links. */
  buttonLinks?: ButtonLinkType[];
  /** For optional content in the cardContent section. */
  cardContent?: JSX.Element;
  /** Optional value to render the layout in a row or column. */
  layout?: LayoutTypes;
  /** Optional value to control the alignment of the text and elements. */
  isCentered?: boolean;
  /** Optional value to control the border. */
  isBordered?: boolean;
}

export default function Card({
  id,
  heading,
  subHeading,
  description,
  href,
  image,
  buttonLinks,
  cardContent,
  layout,
  isCentered,
  isBordered = false,
}: CardProps) {
  const isButtonLinkCard = buttonLinks && buttonLinks.length > 0 ? true : false;

  return (
    <DsCard
      id={id}
      {...(image && {
        imageProps: {
          component: image,
          size: layout === "row" ? "large" : undefined,
        },
      })}
      isCentered={isCentered}
      layout={layout}
      isBordered={isBordered}
      // Override the card-body width for column layout with button links.
      {...(layout === "column" &&
        isButtonLinkCard && {
          sx: {
            // Override the card-body width to 100% to allow for proper centering of buttons.
            ".card-body": { width: "100%" },
          },
        })}
    >
      {/* If the card has button links, don't render a link inside the heading. */}
      {isButtonLinkCard ? (
        <CardHeading level="three">{heading}</CardHeading>
      ) : (
        <CardHeading level="three">
          {href && <Link href={href}>{heading}</Link>}
        </CardHeading>
      )}
      <CardContent>
        {subHeading && subHeading}
        {cardContent && cardContent}
        {description && (
          <Box
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        {buttonLinks && buttonLinks.length > 0 && (
          <Flex
            as="ul"
            direction={{ sm: "column", md: "row" }}
            gap="s"
            {...(layout === "column" && {
              justify: "center",
              m: "auto",
              w: { sm: "fit-content", md: "full" },
            })}
          >
            {buttonLinks.map((buttonLink: ButtonLinkType) => (
              <Box
                id={`button-link-${buttonLink.id}`}
                key={buttonLink.id}
                as="li"
                listStyleType="none"
                w={{ sm: "full", md: "fit-content" }}
                textAlign={{ sm: "center", lg: "initial" }}
              >
                <ButtonLink
                  id={buttonLink.id}
                  link={buttonLink.link}
                  icon={buttonLink.icon}
                />
              </Box>
            ))}
          </Flex>
        )}
      </CardContent>
    </DsCard>
  );
}
