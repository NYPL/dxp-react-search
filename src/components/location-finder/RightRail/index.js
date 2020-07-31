import React from 'react';
// Content
import RightRailContent from './content';
// Components
import * as DS from '@nypl/design-system-react-components';

function RightRail() {
  // Content
  const { more_at_nypl, need_help, support_nypl } = RightRailContent;

  return (

    <div className="bottom-rails">
      <nav className="right-rail" aria-labelledby="right-rail--more-at-nypl">

        <DS.Heading
          className="right-rail__heading"
          id="right-rail--more-at-nypl"
          level={3}
          text="More at NYPL"
        />
        
        <DS.List
            className="right-rail__list"
            modifiers={[
              'no-list-styling'
            ]}
            type="ul"
          >
          {more_at_nypl.map((value, index) => {
            return <li className="right-rail__item"><DS.Link className="right-rail__link" href={value.link}>{value.title}</DS.Link></li>
          })}
        </DS.List>
      </nav>

      <nav className="right-rail" aria-labelledby="right-rail--need-help?-ask-nypl">
        <DS.Heading
          id="right-rail--need-help?-ask-nypl"
          level={3}
          text="Need Help? Ask NYPL"
          className="right-rail__heading"
        />

        <DS.List
            className="right-rail__list"
            modifiers={[
              'no-list-styling'
            ]}
            type="ul"
          >
          {need_help.map((value, index) => {
            if(value.link ) {
              return <li className="right-rail__item"><DS.Link className="right-rail__link" href={value.link}>{value.title}</DS.Link></li>
            } else {
              return <li className="right-rail__item"><span className="right-rail__link">{value.title}</span></li>
            }
          })}
        </DS.List>
      </nav>

      <nav className="right-rail" aria-labelledby="right-rail--support-nypl">
        <DS.Heading
          className="right-rail__heading"
          id="right-rail--support-nypl"
          level={3}
          text="Support NYPL"
        />
        
        <DS.List
            className="right-rail__list"
            modifiers={[
              'no-list-styling'
            ]}
            type="ul"
          >
          {support_nypl.map((value, index) => {
            if(value.type ) {
              return <li className="right-rail__item"><DS.Link linkType="button" className="action-link" href={value.link}>{value.title}</DS.Link></li>
            } else {
              return <li className="right-rail__item"><span className="right-rail__link">{value.title}</span></li>
            }
          })}
        </DS.List>
      </nav>
    </div>
  );
};

export default RightRail;
