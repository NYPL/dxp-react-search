import React from 'react';
import { Heading, List, Link } from '@nypl/design-system-react-components';

function MenuGroup(props) {
  const { id, headingId, title, items } = props;

  function MenuLink({ item }) {
    if (item.type === 'button') {
      if (item.link) {
        return (
          <Link
            linkType="button"
            className="action-link"
            href={item.link}
          >
            {item.title}
          </Link>
        );
      } else {
        return (
          <span>{item.title}</span>
        );
      }
    } else {
      if (item.link) {
        return (
          <Link
            href={item.link}
          >
            {item.title}
          </Link>
        );
      } else {
        return (
          <span>{item.title}</span>
        );
      }
    }
  }

  return (
    <nav id={id} className="menu-group" aria-labelledby={headingId}>
      <Heading
        id={headingId}
        level={3}
        text={title}
      />
      <List
        modifiers={[
          'no-list-styling'
        ]}
        type="ul"
      >
        {items.map((item, index) => {
          let linkDescription;
          if (item.description) {
            linkDescription = <div className="description">{item.description}</div>;
          }
          return (
            <li key={item.title}>
              <MenuLink item={item} />
              {linkDescription}
            </li>
          );
        })}
      </List>
    </nav>
  );
};

export default MenuGroup;
