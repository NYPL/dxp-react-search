import {
  Box,
  Button,
  Heading,
  HeadingLevels,
  Select,
  TextInput,
} from "@nypl/design-system-react-components";
import EventRegistrationFormCustomQuestions from "./EventRegistrationFormCustomQuestions";

const formFields = [
  {
    id: "first-name",
    label: "First Name",
    placeholder: "Enter your first name",
  },
  {
    id: "last-name",
    label: "Last Name",
    placeholder: "Enter your last name",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
  },
];

const ageOptions = [
  {
    id: "adult",
    name: "Adult",
  },
  {
    id: "child",
    name: "Child",
  },
];

interface EventRegistrationFormProps {
  customQuestions: any;
}

function EventRegistrationForm({
  customQuestions,
}: EventRegistrationFormProps) {
  console.log(customQuestions);
  return (
    <Box maxWidth={[null, null, "637px"]}>
      <form
        id="request-visit-form"
        onSubmit={() => console.log("submit!")}
        noValidate
      >
        <Box
          sx={{
            "& h2": {
              paddingBottom: "s",
              borderBottom: "1px solid",
              borderColor: "ui.gray.medium",
            },
          }}
        >
          <Heading id="event-reg" level={HeadingLevels.Two}>
            Event Registration
          </Heading>
          <Box mb="l">
            Form is not currently wired up to send data to Communico
          </Box>
        </Box>
        {formFields.map((formField: any) => (
          <Box mb="s">
            <TextInput
              labelText={formField.label}
              attributes={{
                name: formField.id,
              }}
              //value=""
              isRequired={true}
              showLabel
              placeholder={formField.placeholder}
              showOptReqLabel={false}
              // invalidText={errors.organization}
              // isInvalid={errors.organization ? true : false}
            />
          </Box>
        ))}
        <Box mb="s">
          <Select
            name="audience-ages"
            id="audience-ages"
            labelText="Please select your age group"
            //onChange={handleChange}
            //value={values.library}
            isRequired
            showLabel
            // invalidText={errors.library}
            // isInvalid={errors.library ? true : false}
          >
            {ageOptions.map((ageOption: any) => (
              <option value={ageOption.id}>{ageOption.name}</option>
            ))}
          </Select>
        </Box>

        {customQuestions && (
          <Heading id="event-reg-custom-questions" level={HeadingLevels.Three}>
            Custom Questions
          </Heading>
        )}
        {customQuestions &&
          customQuestions.map((customQuestion: any) => (
            <Box mb="l">
              {EventRegistrationFormCustomQuestions(customQuestion)}
            </Box>
          ))}
        <Button type="submit">Register</Button>
      </form>
    </Box>
  );
}

export default EventRegistrationForm;
