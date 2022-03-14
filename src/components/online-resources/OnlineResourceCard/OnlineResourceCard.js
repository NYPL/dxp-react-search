import React, { useState } from "react";
// Components
import {
  Link as DsLink,
  StatusBadge,
  Button,
  ButtonTypes,
  Icon,
  IconAlign,
  IconNames,
  IconRotationTypes,
  IconSizes,
  Link,
} from "@nypl/design-system-react-components";
import OnlineResourceCardHeading from "./OnlineResourceCardHeading";
import NextDsLink from "../../shared/Link/NextDsLink";
//
import s from "./OnlineResourceCard.module.css";

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
    availabilityStatus,
    accessLocations,
    slug,
  } = item;

  function LabelItem({ label, name }) {
    return (
      <div className={s.labelItem}>
        <label>{label}</label> {name}
      </div>
    );
  }

  function AccessLocations({ items }) {
    if (items.some((item) => item.url !== null)) {
      return (
        <div className={s.labelItem}>
          <label>Access Locations: &nbsp;</label>
          {items.map((item) => {
            if (item.url) {
              return (
                <Link
                  key={item.id}
                  className={`${s.accessLocation} ${
                    item.id === "all-branch-uuid" && s.disabled
                  }`}
                  href={item.url}
                  {...(item.id === "all-branch-uuid" && {
                    "aria-disabled": true,
                  })}
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  // Toggle for show/hide details in Search Results
  const [isToggled, setToggled] = useState(false);
  const toggleDisplay = () => setToggled(!isToggled);

  let detailsClassName = "";
  let buttonText = "Full Details";
  let buttonIconRotation = IconRotationTypes.Rotate0;
  if (collapsible && !isToggled) {
    detailsClassName = s.collapsed;
  } else if (collapsible && isToggled) {
    detailsClassName = s.collapsible;
    buttonIconRotation = IconRotationTypes.Rotate180;
    buttonText = "Close Details";
  }

  function StatusBadgeComponent(availabilityStatus) {
    if (availabilityStatus === "card_required") {
      return (
        <div className={s.statusBadge}>
          <StatusBadge level={"low"}>Library Card Required</StatusBadge>
        </div>
      );
    } else if (availabilityStatus === "onsite_only") {
      return (
        <div className={s.statusBadge}>
          <StatusBadge level={"high"}>On-Site Access Only</StatusBadge>
        </div>
      );
    }
  }

  // Subjects
  let subjectsList = [];
  subjects?.map((subject) => subjectsList.push(subject.name));

  return (
    <div id={`heading-${id}`} className={collapsible ? s.card : s.cardDetailPg}>
      {isCoreResource && <div className={s.resourceType}>Core Resource</div>}
      <div className={s.heading}>
        <OnlineResourceCardHeading {...item} {...ipInfo} />
      </div>
      {StatusBadgeComponent(availabilityStatus)}
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
      {slug && collapsible && (
        <div className={s.shareDatabase}>
          <NextDsLink href={slug}>Share this Database</NextDsLink>
        </div>
      )}
      <div className={s.links}>
        {accessibilityLink && (
          <DsLink href={accessibilityLink}>Accessibility Details</DsLink>
        )}
        {termsConditionsLink && (
          <DsLink href={termsConditionsLink}>Terms & Conditions</DsLink>
        )}
        {privacyPolicyLink && (
          <DsLink href={privacyPolicyLink}>Privacy Policy</DsLink>
        )}
      </div>
      <div className={detailsClassName}>
        <AccessLocations items={accessLocations} />
        {subjects && (
          <LabelItem label="Subjects:" name={subjectsList.join(", ")} />
        )}
        {notes && <LabelItem label="Notes:" name={notes} />}
        {language && <LabelItem label="Language:" name={language} />}
      </div>
      {collapsible && (
        <Button
          className={s.readmore}
          buttonType={ButtonTypes.Secondary}
          onClick={toggleDisplay}
        >
          <Icon
            name={IconNames.Arrow}
            decorative={true}
            //modifiers={["small", "icon-left"]}
            size={IconSizes.Small}
            align={IconAlign.Left}
            iconRotation={buttonIconRotation}
          />
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default OnlineResourceCard;
