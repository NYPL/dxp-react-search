import React, { Fragment } from 'react';
// Components
import { 
  Heading,
  Image,
  Link,
  List,
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import Card from './../Card';

function CardGrid(props) {
  const { title, items } = props;
  // items have id, title, description, imageUrl props

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
        {items.map((item) => {
          return (
            <li 
              key={item.id} 
              className="card-grid__list-item"
              style={{
                'margin-bottom': '2rem',
                'flex': '1 0 calc(33% - 2rem)',
                'margin-right': '2rem',
                'max-width': '384px'
              }}
            >
              <Card
                name={item.name}
                imageUrl={item.imageUrl}
                description={item.description} 
              />
            </li>
          )
        })}
      </List>
    </div>
  );
};

export default CardGrid;
