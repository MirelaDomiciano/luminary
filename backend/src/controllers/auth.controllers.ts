import { Request, Response } from 'express';
import { getUserByEmail, comparePasswords } from '../repositories/user.repository';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validar campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Buscar o usuário pelo email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verificar se o usuário está ativo
    if (!user.isActive) {
      return res.status(401).json({ message: 'User account is inactive' });
    }
    
    // Verificar a senha
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Remover a senha do objeto do usuário antes de enviar na resposta
    const { password: _, ...userWithoutPassword } = user;
    
    // Enviar resposta de sucesso
    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during login', 
      error: (error as Error).message 
    });
  }
}; 