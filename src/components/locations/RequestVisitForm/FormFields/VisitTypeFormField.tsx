import React from "react";
// Components
import {
  Checkbox,
  Radio,
  Select,
  TextInput,
} from "@nypl/design-system-react-components";
// CSS
import s from "./../RequestVisitForm.module.css";
import { FormField as FormFieldProps } from "../types";

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

const inPersonItems = [
  {
    id: "in-person-class-visit",
    label: "Class Visit",
    helperText: "Aptent congue tellus tincidunt torquent",
  },
  {
    id: "in-person-group-tour",
    label: "Group Tour",
    helperText: "Aptent congue tellus tincidunt torquent",
  },
  {
    id: "in-person-offsite",
    label: "Offsite Outreach",
    helperText: "Aptent congue tellus tincidunt torquent",
  },
  {
    id: "in-person-community-partners",
    label: "Opportunities for Community Partners",
    helperText: "Aptent congue tellus tincidunt torquent",
  },
  {
    id: "in-person-other",
    label: "Other",
  },
];

function VisitTypeFormField({
  formValues,
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
        selectedOption={formValues.visitType}
        required
        showLabel
        errorText={formErrors.visitType}
        errored={formErrors.visitType !== undefined}
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {formValues.visitType === "virtual" && (
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
                checked={formValues.virtualVisitServices.includes(
                  virtualServiceItem.id
                )}
                showLabel
                errored={formErrors.virtualVisitServices ? true : false}
              />
              {virtualServiceItem.id === "services-other" && (
                <TextInput
                  attributes={{
                    name: "virtualVisitServicesOther",
                  }}
                  labelText="What other service would you like to receive?"
                  showLabel={false}
                  onChange={handleChange}
                  value={formValues.virtualVisitServicesOther}
                  disabled={
                    !formValues.virtualVisitServices.includes("services-other")
                  }
                  errored={formErrors.virtualVisitServices ? true : false}
                  errorText={formErrors.virtualVisitServices}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
      {formValues.visitType === "in-person" && (
        <fieldset>
          <legend>What would you like to request?</legend>
          {inPersonItems.map((inPersonItem) => (
            <div className={s.checkBox}>
              <Radio
                name="inPersonServices"
                value={inPersonItem.id}
                labelText={inPersonItem.label}
                helperText={inPersonItem.helperText}
                showLabel
                onChange={(e) => handleChange(e)}
                errored={formErrors.inPersonServices ? true : false}
              />
              {inPersonItem.id === "in-person-other" && (
                <TextInput
                  attributes={{
                    name: "inPersonServicesOther",
                  }}
                  labelText="Other request."
                  showLabel={false}
                  onChange={handleChange}
                  value={formValues.inPersonServicesOther}
                  disabled={formValues.inPersonServices !== "in-person-other"}
                  errored={formErrors.inPersonServices ? true : false}
                  errorText={formErrors.inPersonServices}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
}

export default VisitTypeFormField;
