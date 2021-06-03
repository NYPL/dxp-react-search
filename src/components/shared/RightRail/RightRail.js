import React, { Fragment } from 'react';
// Content
import RightRailContent from './content';
// Components
import MenuGroup from '../../shared/MenuGroup';

function RightRail() {
  return (
    <Fragment>
      {RightRailContent.map((menu) => {
        return (
          <MenuGroup
            id={menu.id}
            headingId={menu.title.toLowerCase().replace(/\s/g, '-')}
            title={menu.title}
            items={menu.items}
            orientation="horizontal"
          />
        )
      })}
    </Fragment>
  );
};

export default RightRail;