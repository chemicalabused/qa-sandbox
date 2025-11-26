interface RegisterRequest {
  email: string;
  password: string;
  age: number;
  terms: boolean;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: string;
  errors?: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
