import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  List
} from '@nypl/design-system-react-components';

function CardGrid(props) {
  const { title, children } = props;

  return (
    <div className="card-grid">
      <Heading
        id={title}
        level={2}
        text={title}
      />
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