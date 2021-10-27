import React, { useContext } from "react";
// Components
import {
  Checkbox,
  Radio,
  Select,
  TextInput,
} from "@nypl/design-system-react-components";
// CSS
import s from "./../RequestVisitForm.module.css";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

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
  handleChange,
  handleChangeCheckboxGroup,
}: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <>
      <Select
        name="visitType"
        id="request-visit-select-type"
        labelText="Please select your visit type"
        onChange={handleChange}
        selectedOption={values.visitType}
        required
        showLabel
        errorText={errors.visitType}
        errored={errors.visitType !== undefined}
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {values.visitType === "virtual" && (
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
                  handleChangeCheckboxGroup(
                    "virtualVisitServices",
                    e.target.name
                  )
                }
                checked={values.virtualVisitServices.includes(
                  virtualServiceItem.id
                )}
                showLabel
                errored={errors.virtualVisitServices ? true : false}
              />
              {virtualServiceItem.id === "services-other" && (
                <TextInput
                  attributes={{
                    name: "virtualVisitServicesOther",
                  }}
                  labelText="What other service would you like to receive?"
                  showLabel={false}
                  onChange={handleChange}
                  value={values.virtualVisitServicesOther}
                  disabled={
                    !values.virtualVisitServices.includes("services-other")
                  }
                  errored={errors.virtualVisitServices ? true : false}
                  errorText={errors.virtualVisitServices}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
      {values.visitType === "in-person" && (
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
                errored={errors.inPersonServices ? true : false}
              />
              {inPersonItem.id === "in-person-other" && (
                <TextInput
                  attributes={{
                    name: "inPersonServicesOther",
                  }}
                  labelText="Other request."
                  showLabel={false}
                  onChange={handleChange}
                  value={values.inPersonServicesOther}
                  disabled={values.inPersonServices !== "in-person-other"}
                  errored={errors.inPersonServices ? true : false}
                  errorText={errors.inPersonServices}
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
