export const isValidEmail = (email: string): boolean => {
    // Basic format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Trim the email to remove any whitespace
    const trimmedEmail = email.trim();

    // Check for basic format validity
    if (!emailRegex.test(trimmedEmail)) {
      return false;
    }

    // Check for common mistakes
    if (
      trimmedEmail.includes('..') || // Double dots
      !trimmedEmail.split('@')[1]?.includes('.') || // No dot after @
      trimmedEmail.endsWith('.') // Ends with dot
    ) {
      return false;
    }

    return true;
  };