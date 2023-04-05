import { PropsWithChildren } from "react";
import NextLink from "next/link";
import { LinkProps as NextLinkProps } from "next/dist/client/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export type NextChakraLinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, "as">
>;

// Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: NextChakraLinkProps) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      {...(prefetch === false && { prefetch: prefetch })}
    >
      <ChakraLink
        sx={{
          color: "ui.link.primary",
          textDecoration: "underline",
          _hover: {
            color: "ui.link.secondary",
          },
        }}
        {...chakraProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
