import React from 'react';
// Components
import { Checkbox, List } from '@nypl/design-system-react-components';

function CheckboxList(props) {
  const { items } = props;
  console.log(props)
  function setParentClassName(children) {
    let className = 'item';
    if (children) {
      className = 'item hasChildren';
    }
    return className;
  }

  return (
    <ul {...props.menuProps} className="list list--no-list-styling">
      {items.map((item) => {
        return (
          <li key={item.id} className={setParentClassName(item.children)}>
            <div className="checkbox">
              <Checkbox
                id={item.id}
                labelText={<>{item.name}</>}
                showLabel={true}
                name={item.name}
              />
            </div>
              {item.children &&
                <List 
                  type='ul' 
                  modifiers={['no-list-styling']}
                >
                  {item.children.map((childItem) => {
                    return (
                      <li key={childItem.id} className="item-child">
                        <div className="checkbox">
                          <Checkbox
                            id={childItem.id}
                            labelText={<>{childItem.name}</>}
                            showLabel={true}
                            name={childItem.name}
                          />
                        </div>
                      </li>
                    )
                  })}
                </List>
              }
          </li>
        );
      })}
    </ul>
  )
}

export default CheckboxList;