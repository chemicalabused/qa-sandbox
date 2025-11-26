interface ValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

interface FormData {
  email: string;
  password: string;
  age: string;
  terms: boolean;
}

export function validateForm(data: FormData): ValidationResult {
  const errors = [];

  // Email validation
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

  // Password validation
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

  // Age validation
  if (!data.age || data.age === '') {
    errors.push({
      field: 'age',
      code: 'AGE_REQUIRED',
      message: 'Age is required'
    });
  } else if (isNaN(Number(data.age))) {
    errors.push({
      field: 'age',
      code: 'AGE_INVALID',
      message: 'Age must be a number'
    });
  } else if (Number(data.age) < 18) {
    errors.push({
      field: 'age',
      code: 'AGE_TOO_YOUNG',
      message: 'You must be at least 18 years old'
    });
  } else if (Number(data.age) > 99) {
    errors.push({
      field: 'age',
      code: 'AGE_TOO_OLD',
      message: 'Age must be max 99'
    });
  }

  // Terms validation
  if (!data.terms) {
    errors.push({
      field: 'terms',
      code: 'TERMS_REQUIRED',
      message: 'You must accept terms and conditions'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
