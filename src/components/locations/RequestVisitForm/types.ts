export interface FormField {
  formState: any;
  formErrors: any;
  handleChange?: any;
  handleCheckboxGroupChange?: any;
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
}
