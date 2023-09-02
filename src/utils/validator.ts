interface EmailValidationResult {
  isValid: boolean;
  errorMsg?: string;
}

export const validateEmail = (email: string, minLength: number = 5, maxLength: number = 255): EmailValidationResult => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length < minLength) {
    return {
      isValid: false,
      errorMsg: `Email must be at least ${minLength} characters long.`,
    };
  }

  if (email.length > maxLength) {
    return {
      isValid: false,
      errorMsg: `Email cannot exceed ${maxLength} characters.`,
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMsg: 'Invalid email format.',
    };
  }

  return {
    isValid: true,
  };
};

interface PasswordValidationResult {
  isValid: boolean;
  errorMsg?: string;
}

export const validatePassword = (password: string, minLength: number = 8): PasswordValidationResult => {
  // Set initial flags to false
  let hasMinLen = false;
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSpecial = false;
  let hasSpace = false;

  // Check if password length is at least minLength characters
  if (password.length >= minLength) {
    hasMinLen = true;
  }

  // Loop through each character in the password
  for (const char of password) {
    if (char.match(/[A-Z]/)) {
      hasUpper = true;
    } else if (char.match(/[a-z]/)) {
      hasLower = true;
    } else if (char.match(/[0-9]/)) {
      hasNumber = true;
    } else if (char.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
      hasSpecial = true;
    } else if (char.match(/\s/)) {
      hasSpace = true;
    }
  }

  if (!hasMinLen) {
    return {
      isValid: false,
      errorMsg: `Password must be at least ${minLength} characters long.`,
    };
  }

  if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
    return {
      isValid: false,
      errorMsg: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    };
  }

  if (hasSpace) {
    return {
      isValid: false,
      errorMsg: 'Password cannot contain spaces.',
    };
  }

  return {
    isValid: true,
  };
};

