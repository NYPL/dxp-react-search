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
    slug,
    name, 
    description, 
    updateFrequency, 
    printEquivalent,
    notes,
    format,
    language,
    outputType
  } = item;

  //console.log(slug)

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