import React, { Fragment } from 'react';
// Components
import MenuGroup from './../../shared/MenuGroup';
// Content
import SidebarMenusContent from './content';

function SidebarMenus() {
  return (
    <Fragment>
      {SidebarMenusContent.map((menu) => {
        return (
          <MenuGroup
            id={menu.id}
            headingId={menu.title.toLowerCase().replace(/\s/g, '-')}
            title={menu.title}
            items={menu.items}
            orientation="vertical"
          />
        )
      })}
    </Fragment>
  );
};

export default SidebarMenus;
