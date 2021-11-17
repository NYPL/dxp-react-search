var xss = require("xss");

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
  // XSS options.
  const options = {
    whiteList: {}, // Don't allow any html tags.
    stripIgnoreTag: true, // Don't allow any html tags.
    stripIgnoreTagBody: ["script"], // Strip any script tags.
  };

  const emailBody = `
    <p data-testid="contactName">
      <strong>Contact Name:</strong> ${xss(formValues.contactName, options)}
    </p>
    <p data-testid="contactEmail">
      <strong>Contact Email:</strong> ${xss(formValues.contactEmail, options)}
    </p>
    <p data-testid="organization">
      <strong>School or Organization:</strong> ${xss(organization, options)}
    </p>
    <p data-testid="library">
      <strong>Library:</strong> ${xss(formValues.library, options)}
    </p>
    <p data-testid="visitType">
      <strong>Visit Type:</strong> ${xss(formValues.visitType, options)}
    </p>
    <p data-testid="vv-services">
      <strong>Virtual Visit Services:</strong> ${xss(virtualServices, options)}
    </p>
    <p data-testid="ip-services">
      <strong>In Person Visit Services:</strong> ${xss(
        inPersonServices,
        options
      )}
    </p>
    <p data-testid="ageGroup">
      <strong>Age Group or Grade:</strong> ${xss(ageGroup, options)}
    </p>
  `;
  return emailBody;
}

export default formatRequestVisitEmail;
