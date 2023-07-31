import jwt from 'jsonwebtoken';

const JWT_SECRET = 'homework';

export function generateToken(username: string): string {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

export function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    });
}