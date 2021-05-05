import React from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
//
import { Heading, StatusBadge } from '@nypl/design-system-react-components';
import s from './OnlineResourceCard.module.css' 

function OnlineResourceCard({ item }) {
  const { 
    id, 
    name, 
    description, 
    updateFrequency, 
    printEquivalent,
    notes,
    format,
    language,
    outputType
  } = item;

  function LabelItem({ label, name }) {
    return (
      <div className={s.labelItem}>
        <label>{label}</label> {name}
      </div>
    );
  }

  return (
    <div className={s.card}>
      <div className={s.resourceType}>Core Resource</div>
      <div className={s.heading}>
        <Link href="/research/online-resources/time-magazine-archive">
          <a>
            <Heading
              id={id}
              level={3}
              text={name}
            />
          </a>
        </Link>
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

      <LabelItem label="Notes:" name={notes} />
      <LabelItem label="Update Frequency:" name={updateFrequency} />
      <LabelItem label="Print Equivalent:" name={printEquivalent} />

      <LabelItem label="Format:" name={format} />
      <LabelItem label="Language:" name={language} />
      <LabelItem label="Output Type:" name={outputType} />
    </div>
  );
}

export default OnlineResourceCard;