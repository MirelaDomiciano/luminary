import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as authRepository from '../repositories/auth.repository';
import { createUser } from '../repositories/user.repository';

export const signupController = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email and password are required.' });
    return;
  }
  
  // Check if user already exists
  const existingUserByEmail = await authRepository.getUserByEmail(email);
  if (existingUserByEmail) {
    res.status(409).json({ message: 'Email already in use' });
    return;
  }
  
  try {
    // Create new user
    const newUser = await createUser({
      username,
      email,
      password,
      isActive: true
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'pblc12',
      { expiresIn: '1h' }
    );
    
    res.status(201).json({
      message: 'User created successfully!',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error: any) {
    if (error.message.includes('Username already in use')) {
      res.status(409).json({ message: 'Username already in use' });
      return;
    }
    if (error.message.includes('Email already in use')) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }
    
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }
  
  const user = await authRepository.getUserByEmail(email);
  
  if (!user) {
    res.status(401).json({ message: 'User not found.' });
    return;
  }
  
  // In a real implementation, the password would be hashed
  // For simplicity in this example, we're directly comparing
  // But in production, use argon2.verify()
  let passwordValid = false;
  
  try {
    // Check if the password is already hashed (starts with $argon2)
    if (user.password.startsWith('$argon2')) {
      passwordValid = await argon2.verify(user.password, password);
    } else {
      // For the seed data with unhashed passwords, do a direct comparison
      // This is only for development and testing
      passwordValid = user.password === password;
    }
  } catch (err) {
    console.error('Error verifying password:', err);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
  
  if (!passwordValid) {
    res.status(401).json({ message: 'Invalid password.' });
    return;
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'pblc12',
    { expiresIn: '1h' }
  );
  
  res.json({ 
    message: 'Login successful!', 
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
}; 