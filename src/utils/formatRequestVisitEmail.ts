function formatRequestVisitEmail(formValues: any) {
  // School or Organization
  let organization;
  if (formValues.organization) {
    organization = formValues.organization;
  }
  if (formValues.noSchoolOrOrg) {
    organization = "none";
  }
  // Virtual services.
  let virtualServices = formValues.virtualVisitServices.join(", ");
  if (formValues.virtualVisitServicesOther) {
    virtualServices = formValues.virtualVisitServicesOther;
  }
  // In person visit services
  let inPersonServices = formValues.inPersonServices;
  if (formValues.inPersonServicesOther) {
    inPersonServices = formValues.inPersonServicesOther;
  }
  // Age Group or Grade
  const ageGroup = formValues.ageGroup.join(", ");

  return `
    <p data-testid="contactName">
      <strong>Contact Name:</strong> ${formValues.contactName}
    </p>
    <p data-testid="contactEmail">
      <strong>Contact Email:</strong> ${formValues.contactEmail}
    </p>
    <p data-testid="organization">
      <strong>School or Organization:</strong> ${organization}
    </p>
    <p data-testid="library">
      <strong>Library:</strong> ${formValues.library}
    </p>
    <p data-testid="visitType">
      <strong>Visit Type:</strong> ${formValues.visitType}
    </p>
    <p data-testid="vv-services">
      <strong>Virtual Visit Services:</strong> ${virtualServices}
    </p>
    <p data-testid="ip-services">
      <strong>In Person Visit Services:</strong> ${inPersonServices}
    </p>
    <p data-testid="ageGroup">
      <strong>Age Group or Grade:</strong> ${ageGroup}
    </p>
  `;
}

export default formatRequestVisitEmail;
