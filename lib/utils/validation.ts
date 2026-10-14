/**
 * Validates phone number format
 * Accepts:
 * - 09 followed by 8 digits (total: 10 digits)
 * - 9 followed by 8 digits (total: 9 digits)
 * - 07 followed by 8 digits (total: 10 digits)
 * - 7 followed by 8 digits (total: 9 digits)
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Remove any whitespace
  const cleanedNumber = phoneNumber.trim();
  
  // Check if the phone number matches the allowed formats
  const phoneRegex = /^(09|9|07|7)\d{8}$/;
  
  return phoneRegex.test(cleanedNumber);
}

/**
 * Gets a user-friendly error message for invalid phone numbers
 */
export function getPhoneNumberErrorMessage(): string {
  return 'Phone number must start with 09, 9, 07, or 7 followed by 8 digits';
}

/**
 * Normalizes phone number to 9 digits for API requests
 * Removes leading 0 if present (09 -> 9, 07 -> 7)
 */
export function normalizePhoneNumber(phoneNumber: string): string {
  const cleanedNumber = phoneNumber.trim();
  
  // If starts with 0, remove it
  if (cleanedNumber.startsWith('0')) {
    return cleanedNumber.substring(1);
  }
  
  return cleanedNumber;
}

/**
 * Formats phone number by removing any non-digit characters
 */
export function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}

