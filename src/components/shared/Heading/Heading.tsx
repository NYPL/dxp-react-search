import {
  Heading as DsHeading,
  HeadingLevels,
  HeadingSizes,
} from "@nypl/design-system-react-components";
import { ReactElement, ComponentPropsWithoutRef } from "react";

const headingSizeMap: Record<string, HeadingSizes> = {
  h1: "heading2",
  h2: "heading3",
  h3: "heading5",
};

interface HeadingProps extends ComponentPropsWithoutRef<typeof DsHeading> {
  id?: string;
  level: HeadingLevels;
  size?: HeadingSizes;
  children: string | ReactElement;
  color?: string;
}

export default function Heading({
  id,
  level,
  size,
  children,
  color = "ui.black",
  ...rest
}: HeadingProps): ReactElement {
  const finalSize = size ? size : headingSizeMap[level];
  return (
    <DsHeading id={id} level={level} size={finalSize} color={color} {...rest}>
      {children}
    </DsHeading>
  );
}
