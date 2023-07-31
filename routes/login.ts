import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import User from '../models/user';
import logError from '../errors/errorLogger';
import jwt from 'jsonwebtoken';
import { generateToken } from '../services/webtoken';

const router = express.Router();

router.patch('/', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ where: { login, password } });
  
        if (!user) {
            return res.status(401).json({ message: 'Invalid input data' });
        }
  
        const token = generateToken(user.login);

        user.token = token;
        await user.save();

        return res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;