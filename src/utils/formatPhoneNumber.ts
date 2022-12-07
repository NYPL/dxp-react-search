function formatPhoneNumber(phoneNumberString: string | null) {
  if (phoneNumberString == null) {
    return null;
  }
  // Get just the digits from the string.
  const phoneDigits = phoneNumberString.replace(/[^0-9]+/g, "");
  // Check if number length equals to 10
  if (phoneDigits.length === 10) {
    // Reformat and return phone number
    return phoneDigits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  // If the data is bad and not formattable, return null
  return null;
}

export default formatPhoneNumber;
