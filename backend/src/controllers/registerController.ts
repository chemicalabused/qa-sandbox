import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateRegistration } from '../validation/backendValidation.js';
import { db } from '../database/db.js';

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password, age, terms } = req.body;

    const validation = validateRegistration({ email, password, age, terms });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    const userId = uuidv4();
    db.createUser({
      id: userId,
      email,
      password,
      age,
      terms
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
