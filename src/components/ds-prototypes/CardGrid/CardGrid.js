import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  List
} from '@nypl/design-system-react-components';

function CardGrid(props) {
  const { title, description, children } = props;

  return (
    <div className="card-grid">
      <Heading
        id={title}
        level={2}
        text={title}
      />
      {description &&
        <p>{description}</p>
      }
      <List
        className="card-grid__list"
        modifiers={[
          'no-list-styling'
        ]}
        type="ul"
      >
        {children}
      </List>
    </div>
  );
};

export default CardGrid;