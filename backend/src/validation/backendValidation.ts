interface ValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

interface RegisterData {
  email: string;
  password: string;
  age: number;
  terms: boolean;
}

export function validateRegistration(data: RegisterData): ValidationResult {
  const errors = [];

  // Email validation - same as FE
  if (!data.email || data.email.trim() === '') {
    errors.push({
      field: 'email',
      code: 'EMAIL_REQUIRED',
      message: 'Email is required'
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: 'email',
      code: 'EMAIL_INVALID',
      message: 'Invalid email format'
    });
  }

  // Password validation - same as FE
  if (!data.password || data.password === '') {
    errors.push({
      field: 'password',
      code: 'PASSWORD_REQUIRED',
      message: 'Password is required'
    });
  } else if (data.password.length < 8) {
    errors.push({
      field: 'password',
      code: 'PASSWORD_TOO_SHORT',
      message: 'Password must be at least 8 characters'
    });
  }

  // Age validation - min 10 instead of 18 (trap!)
  if (data.age === undefined || data.age === null) {
    errors.push({
      field: 'age',
      code: 'AGE_REQUIRED',
      message: 'Age is required'
    });
  } else if (typeof data.age !== 'number' || isNaN(data.age)) {
    errors.push({
      field: 'age',
      code: 'AGE_INVALID',
      message: 'Age must be a number'
    });
  } else if (data.age < 10) {
    errors.push({
      field: 'age',
      code: 'AGE_TOO_YOUNG',
      message: 'You must be at least 10 years old'
    });
  }

  // Terms validation - NONE (trap!)

  return {
    isValid: errors.length === 0,
    errors
  };
}
