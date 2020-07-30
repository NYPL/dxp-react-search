import React from 'react';
// Components
import * as DS from '@nypl/design-system-react-components';

function RightRail() {

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
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/library-card">
                Get a Library Card
              </a>
            </DS.Link>
          </li>          
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/books-more/recommendations/staff-picks/adults">Find Your Next Book</a>
            </DS.Link>
          </li>          
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/locations">Search Library Locations</a>
            </DS.Link>
          </li>     
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/help/computers-internet-and-wireless-access/reserving-computer">Reserve a Computer</a>
            </DS.Link>
          </li>
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
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/email-us">Email us your question</a>
            </DS.Link>
          </li>          
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/get-help/contact-us/chat">Chat with a librarian</a>
            </DS.Link>
          </li>
          <li className="right-rail__item">
            <span className="right-rail__link">Text (917) 983-4584</span>
          </li>
          <li className="right-rail__item">
            <span className="right-rail__link">Call (917) ASK-NYPL</span>
          </li>          
          <li className="right-rail__item">
            <span className="right-rail__link">(917) 275-6975</span>
          </li>
          <li className="right-rail__item">
            <span className="right-rail__link right-rail__link--simple">TTY 212-930-0020</span>
          </li>
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
          <li className="right-rail__item">
            <DS.Link className="right-rail__link">
              <a href="https://www.nypl.org/help/about-nypl/volunteer-nypl">Volunteer</a>
            </DS.Link>
          </li>                
          <li className="right-rail__item right-rail__item--button">                       
            <DS.Link className="action-link">
              <a href="https://secure.nypl.org/site/Donation2?7825_donation=form1&amp;df_id=7825&amp;mfc_pref=T&amp;set_custom_Donation_Direction=Mid-Manhattan%20at%2042nd%20Street%20Library&amp;s_src=FRQXXZZ_QWLPN">Support Your Library</a>
            </DS.Link>
          </li>
        </DS.List>
      </nav>
    </div>
  );
};

export default RightRail;
