import React, { useState } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
//
import { 
  Heading,
  Link as DsLink,
  StatusBadge,
  Button,
  ButtonTypes,
  Icon,
  IconNames,
  IconRotationTypes 
} from '@nypl/design-system-react-components';
import s from './OnlineResourceCard.module.css' 

function OnlineResourceCard({ item, collapsible }) {
  const { 
    id,
    slug,
    name, 
    description, 
    notes,
    subjects,
    language,
    accessibilityLink,
    termsConditionsLink,
    privacyPolicyLink,
  } = item;

  function LabelItem({ label, name }) {
    return (
      <div className={s.labelItem}>
        <label>{label}</label> {name}
      </div>
    );
  }

  function CardHeading(props) {
    const { id, name, slug } = props;

    if (slug) {
      return (
        <Link href={slug}>
          <a>
            <Heading
              id={id}
              level={3}
              text={name}
            />
          </a>
        </Link>
      )
    } else {
      return (
        <Heading
          id={id}
          level={3}
          text={name}
        />
      )
    }
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

  return (
    <div className={s.card}>
      <div className={s.resourceType}>Core Resource</div>
      <div className={s.heading}>
        <CardHeading id={id} slug={slug} name={name} />
      </div>
      <div className={s.statusBadge}>
        <StatusBadge 
          level={"low"} 
          className={'location__hours-status'}
        >
          Library Card Required
        </StatusBadge>
      </div>
      <div>{description}</div>

      <div className={s.links}>
        <DsLink
          href={accessibilityLink}
        >
          Accessibility Details
        </DsLink>
        <DsLink
          href={termsConditionsLink}
        >
          Terms & Conditions
        </DsLink>
        <DsLink
          href={privacyPolicyLink}
        >
          Privacy Policy
        </DsLink>
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
