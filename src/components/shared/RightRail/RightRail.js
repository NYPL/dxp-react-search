import React, { Fragment } from 'react';
// Content
import RightRailContent from './content';
// Components
import * as DS from '@nypl/design-system-react-components';
import MenuGroup from '../../shared/MenuGroup';

function RightRail() {
  // Content
  const { more_at_nypl, need_help, support_nypl } = RightRailContent;

  return (
    <div className="bottom-rails">
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
    </div>
  );
};

export default RightRail;
