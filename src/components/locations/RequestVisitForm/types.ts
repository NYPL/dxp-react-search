export interface FormField {
  formValues: FormValues;
  formErrors: FormErrors;
  handleChange?: any;
  handleChangeCheckboxGroup?: any;
}

export interface FormValues {
  library: string;
  visitType: string;
  organization: string;
  noSchoolOrOrg: boolean;
  ageGroup: string[] | null;
  contactName: string;
  contactEmail: string;
  virtualVisitServices: string[];
  virtualVisitServicesOther: string;
  inPersonServices: string;
  inPersonServicesOther: string;
}

export interface FormErrors {
  library?: string;
  visitType?: string;
  organization?: string;
  noSchoolOrOrg?: string;
  ageGroup?: string;
  contactName?: string;
  contactEmail?: string;
  virtualVisitServices?: string;
  virtualVisitServicesOther?: string;
  inPersonServices?: string;
  inPersonServicesOther?: string;
}

export interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSumitted: boolean;
}

export interface FormFieldProps {
  handleChange?: any;
  handleChangeCheckboxGroup?: any;
}
