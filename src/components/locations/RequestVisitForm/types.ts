export interface FormState {
  values: FormValues;
  errors?: FormErrors;
  touched?: { [key: string]: boolean };
  isValid?: boolean;
  isSubmitted?: boolean;
  serverError?: boolean;
}
import { FormCheckboxValueType } from "./FormFields/AgeGroupFormField";

export interface FormFieldProps {
  handleChange?: any;
  handleChangeCheckboxGroup?: any;
}

export interface FormValues {
  library: string;
  visitType: string;
  organization: string;
  noSchoolOrOrg: boolean;
  notHoom: boolean;
  ageGroup: FormCheckboxValueType[] | null;
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
