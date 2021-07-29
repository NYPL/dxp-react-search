import React, { useState } from 'react';
// Components
import {
  Link as DsLink,
  StatusBadge,
  Button,
  ButtonTypes,
  Icon,
  IconNames,
  IconRotationTypes 
} from '@nypl/design-system-react-components';
import OnlineResourceCardHeading from './OnlineResourceCardHeading';
import s from './OnlineResourceCard.module.css';

function OnlineResourceCard({ item, collapsible, ipInfo }) {
  const { 
    id,
    description, 
    notes,
    subjects,
    language,
    accessibilityLink,
    termsConditionsLink,
    privacyPolicyLink,
    isCoreResource,
    isFreeResource,
    availabilityStatus
  } = item;

  function LabelItem({ label, name }) {
    return (
      <div className={s.labelItem}>
        <label>{label}</label> {name}
      </div>
    );
  }

  // Subjects list.
  // @TODO make sure this works if no subjects
  let subjectsList = [];
  subjects.map(subject => {
    subjectsList.push(subject.name);
  });

  // Toggle for show/hide details in Search Results
  const [isToggled, setToggled] = useState(false);
  const toggleDisplay = () => setToggled(!isToggled);

  let detailsClassName = '';
  let buttonText = 'Full Details';
  let buttonIconRotation = IconRotationTypes.rotate0;
  if (collapsible && !isToggled) {
    detailsClassName = s.collapsed;
  } else if (collapsible && isToggled) {
    detailsClassName = s.collapsible;
    buttonIconRotation = IconRotationTypes.rotate180;
    buttonText = 'Close Details';
  }

  function StatusBadgeComponent(availabilityStatus) {
    if (availabilityStatus === 'card_required') {
      return (
        <div className={s.statusBadge}>
          <StatusBadge level={"low"}>
            Library Card Required
          </StatusBadge>
        </div>
      )
    } else if (availabilityStatus === 'onsite_only') {
      return (
        <div className={s.statusBadge}>
          <StatusBadge level={"high"}>
            On-site Access Only
          </StatusBadge>
        </div>
      )
    }
  }

  return (
    <div id={id} className={collapsible ? s.card : s.cardDetailPg}>
      {isCoreResource &&
        <div className={s.resourceType}>Core Resource</div>
      }
      <div className={s.heading}>
        <OnlineResourceCardHeading {...item} {...ipInfo} />
      </div>
      {StatusBadgeComponent(availabilityStatus)}
      <div dangerouslySetInnerHTML={{
        __html: description 
      }}></div>
      <div className={s.links}>
        {accessibilityLink &&
          <DsLink href={accessibilityLink}>
            Accessibility Details
          </DsLink>
        }
        {termsConditionsLink &&
          <DsLink href={termsConditionsLink}>
            Terms & Conditions
          </DsLink>
        }
        {privacyPolicyLink &&
          <DsLink href={privacyPolicyLink}>
            Privacy Policy
          </DsLink>
        }
      </div>
      <div className={detailsClassName}>
        <LabelItem label="Notes:" name={notes} />
        <LabelItem label="Language:" name={language} />
        <LabelItem label="Subjects:" name={subjectsList.join(', ')} />
      </div>
      {collapsible &&
        <Button
          className={s.readmore}
          buttonType={ButtonTypes.Secondary}
          onClick={toggleDisplay}
        >
          <Icon
            name={IconNames.arrow}
            decorative={true}
            modifiers={["small", "icon-left"]}
            iconRotation={buttonIconRotation}
          />
          {buttonText}
        </Button>
      }
    </div>
  );
}

export default OnlineResourceCard;