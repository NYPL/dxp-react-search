import React from "react";
import { Heading, HeadingLevels } from "@nypl/design-system-react-components";
import s from "./Text.module.css";

interface TextProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
}

function Text({ id, type, heading, text }: TextProps) {
  return (
    <div id={id} className={s.container}>
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      <div className={s.text} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default Text;
