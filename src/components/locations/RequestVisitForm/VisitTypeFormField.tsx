import React, { useEffect, useState } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import {
  Button,
  Checkbox,
  Heading,
  HeadingDisplaySizes,
  Radio,
  Select,
  TextInput,
} from "@nypl/design-system-react-components";
// Next
import { useRouter } from "next/router";
// CSS
import s from "./RequestVisitForm.module.css";
import { FormField as FormFieldProps } from "./types";

const virtualServicesItems = [
  {
    id: "services-introduction",
    label: "Introduction to the Library",
  },
  {
    id: "services-registration",
    label: "Library Card Registration",
  },
  {
    id: "services-resources",
    label:
      "Online Resource Instruction (Digital Collections, Research, Database, etc)",
  },
  {
    id: "services-other",
    label: "Other:",
  },
];

function VisitTypeFormField({
  formState,
  formErrors,
  handleChange,
  handleCheckboxGroupChange,
}: FormFieldProps) {
  return (
    <>
      <Select
        name="visitType"
        id="request-visit-select-type"
        labelText="Please select your visit type"
        onChange={handleChange}
        selectedOption={formState.visitType}
        required
        showLabel
        errorText={formErrors.visitType}
        errored={formErrors.visitType}
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {formState.visitType === "virtual" && (
        <fieldset>
          <legend>
            What services would you like to include in your virtual visit?
          </legend>
          {virtualServicesItems.map((virtualServiceItem) => (
            <div className={s.checkBox}>
              <Checkbox
                labelText={virtualServiceItem.label}
                name={virtualServiceItem.id}
                onChange={(e) =>
                  handleCheckboxGroupChange(
                    "virtualVisitServices",
                    e.target.name
                  )
                }
                // @ts-ignore
                checked={formState.virtualVisitServices.includes(
                  virtualServiceItem.id
                )}
                showLabel
              />
              {virtualServiceItem.id === "services-other" && (
                <TextInput
                  attributes={{
                    name: "virtualVisitServicesOther",
                  }}
                  labelText="What other service would you like to receive?"
                  showLabel={false}
                  onChange={handleChange}
                  value={formState.virtualVisitServicesOther}
                  disabled={formState.virtualVisitServicesOther}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
      {formState.visitType === "in-person" && (
        <fieldset>
          <legend>What would you like to request?</legend>
          <div className={s.checkBox}>
            <Radio
              helperText="Aptent congue tellus tincidunt torquent"
              labelText="Class Visit"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Adipiscing sit laoreet eros lorem enim aliquet"
              labelText="Group Tour"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Inceptos hac hendrerit cubilia sapien interdum est"
              labelText="Offsite Outreach"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Inceptos hac hendrerit cubilia sapien interdum est"
              labelText="Opportunities for Community Partners"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              className={s.other}
              labelText="Other:"
              name="in-person-request"
              showLabel
            />
            <TextInput labelText="Other request." showLabel={false} />
          </div>
        </fieldset>
      )}
    </>
  );
}

export default VisitTypeFormField;
