import {
  Box,
  Button,
  Checkbox,
  Heading,
  HeadingLevels,
  Select,
  TextInput,
  TextInputTypes,
} from "@nypl/design-system-react-components";

function EventRegistrationFormCustomQuestions(customQuestion: any) {
  switch (customQuestion.formType) {
    case "text":
      return (
        <TextInput
          id={customQuestion.id}
          labelText={customQuestion.label}
          attributes={{
            name: customQuestion.id,
          }}
          //value=""
          isRequired={customQuestion.required}
          showLabel
          //showOptReqLabel={false}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          id={customQuestion.id}
          labelText={customQuestion.label}
          value=""
          isRequired={customQuestion.required}
          showLabel
          //placeholder={formField.placeholder}
        />
      );
    case "select":
      return (
        <Select
          id={customQuestion.id}
          name={customQuestion.id}
          labelText={customQuestion.label}
          //onChange={handleChange}
          //value={values.library}
          isRequired={customQuestion.required}
          showLabel
          // invalidText={errors.library}
          // isInvalid={errors.library ? true : false}
        >
          {customQuestion.options.map((selectOption: any) => (
            <option value={selectOption}>{selectOption}</option>
          ))}
        </Select>
      );
    case "textarea":
      return (
        <TextInput
          id={customQuestion.id}
          type={TextInputTypes.textarea}
          labelText={customQuestion.label}
          attributes={{
            name: customQuestion.id,
          }}
          //value=""
          isRequired={customQuestion.required}
          showLabel
          //showOptReqLabel={false}
        />
      );
  }
}

export default EventRegistrationFormCustomQuestions;
