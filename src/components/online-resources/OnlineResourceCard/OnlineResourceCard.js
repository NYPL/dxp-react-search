import React from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
//
import { Heading, Link as DsLink, StatusBadge } from '@nypl/design-system-react-components';
import s from './OnlineResourceCard.module.css' 

function OnlineResourceCard({ item }) {
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
    privacyPolicyLink
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

      <LabelItem label="Notes:" name={notes} />
      <LabelItem label="Language:" name={language} />
      <LabelItem label="Subjects:" name={subjectsList.join(', ')} />
    </div>
  );
}

export default OnlineResourceCard;