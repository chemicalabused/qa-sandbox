import { useState } from 'react';
import { validateForm } from '../validation/frontendValidation';
import { registerUser } from '../api/registerApi';

interface FormErrors {
  [key: string]: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    terms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    const validation = validateForm(formData);

    if (!validation.isValid) {
      const newErrors: FormErrors = {};
      validation.errors.forEach(err => {
        newErrors[err.field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        age: Number(formData.age),
        terms: formData.terms
      });

      if (response.success) {
        setSuccess(`Registration successful! User ID: ${response.userId}`);
        setErrors({});
      } else if (response.errors) {
        const newErrors: FormErrors = {};
        response.errors.forEach(err => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
      }
    } catch {
      setErrors({ form: 'Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1 style={styles.title}>Registration Form</h1>

      <div style={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </div>

      <div style={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}
      </div>

      <div style={styles.field}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.age && <span style={styles.error}>{errors.age}</span>}
      </div>

      <div style={styles.checkboxField}>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        <label htmlFor="terms">I accept the terms and conditions</label>
        {errors.terms && <span style={styles.error}>{errors.terms}</span>}
      </div>

      {errors.form && <div style={styles.error}>{errors.form}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  field: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  checkboxField: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  error: {
    color: 'red',
    fontSize: '12px',
    display: 'block',
    marginTop: '4px'
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#e8f5e9',
    borderRadius: '4px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
