import React, { Fragment } from "react";

interface CardGridProps {
  //
  templateColumns: string;
  //
  gap: string;
  /** The children of the card grid */
  children: any;
}

function CardGrid({ templateColumns, gap, children }: CardGridProps) {
  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: templateColumns,
        gridGap: gap,
      }}
    >
      {children}
    </ul>
  );
}

export default CardGrid;
