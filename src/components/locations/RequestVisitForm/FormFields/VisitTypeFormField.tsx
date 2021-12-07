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
    id: "reader-advisory",
    label: "Reader Advisory",
  },
  {
    id: "services-resources",
    label:
      "Online Resource Instruction (Articles & Databases, Digital Collections, etc.)",
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
    helperText: "General library orientation or a customized research lesson",
  },
  {
    id: "in-person-group-tour",
    label: "Group Tour",
    helperText: "Guided exploration of the library and its resources",
  },
  {
    id: "in-person-offsite",
    label: "Offsite Community Outreach",
    helperText:
      "Invite library staff to share resources at your community event",
  },
  /*{
    id: "in-person-community-partners",
    label: "Opportunities for Community Partners",
    helperText: "Aptent congue tellus tincidunt torquent",
  },
  */
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
        value={values.visitType}
        isRequired
        showLabel
        invalidText={errors.visitType}
        isInvalid={errors.visitType !== undefined}
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {values.visitType === "virtual" && (
        <fieldset className="request-visit__visit-type">
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
                isChecked={values.virtualVisitServices.includes(
                  virtualServiceItem.id
                )}
                showLabel
                isInvalid={errors.virtualVisitServices ? true : false}
              />
              {virtualServiceItem.id === "services-other" && (
                <div className={s.otherInput}>
                  <TextInput
                    attributes={{
                      name: "virtualVisitServicesOther",
                    }}
                    labelText="What other service would you like to receive?"
                    showLabel={false}
                    onChange={handleChange}
                    value={values.virtualVisitServicesOther}
                    isDisabled={
                      !values.virtualVisitServices.includes("services-other")
                    }
                    isInvalid={errors.virtualVisitServices ? true : false}
                    invalidText={errors.virtualVisitServices}
                  />
                </div>
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
                isInvalid={errors.inPersonServices ? true : false}
              />
              {inPersonItem.id === "in-person-other" && (
                <div className={s.otherInput}>
                  <TextInput
                    attributes={{
                      name: "inPersonServicesOther",
                    }}
                    labelText="Other request."
                    showLabel={false}
                    onChange={handleChange}
                    value={values.inPersonServicesOther}
                    isDisabled={values.inPersonServices !== "in-person-other"}
                    isInvalid={errors.inPersonServices ? true : false}
                    invalidText={errors.inPersonServices}
                  />
                </div>
              )}
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
}

export default VisitTypeFormField;
