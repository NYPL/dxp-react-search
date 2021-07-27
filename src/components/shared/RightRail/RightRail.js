import React, { Fragment } from 'react';
// Components
import MenuGroup from '../../shared/MenuGroup';

function RightRail({menuContent, orientation}) {
  return (
    <Fragment>
      <div className={"rail rail--"+ orientation}>
        {menuContent.map((menu) => {
          return (
            <MenuGroup
              id={menu.id}
              key={menu.id}
              headingId={menu.title.toLowerCase().replace(/\s/g, '-')}
              title={menu.title}
              items={menu.items}
              orientation={orientation}
            />
          )
        })}
      </div>
    </Fragment>
  );
};

export default RightRail;
