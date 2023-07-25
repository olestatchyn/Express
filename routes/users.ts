import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import User from '../models/user';

const router = express.Router();
const { Op } = require('sequelize');

const schema = Joi.object({
    login: Joi.string().min(6).max(20).required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)/).required(),
    age: Joi.number().min(4).max(130).required()
});

router.get('/', async (req, res) => {
    if(Object.keys(req.query).length == 2){
        const { loginSubstring, limit } = req.query;
        if (loginSubstring && limit) {
            const foundUsers = await User.findAll({
                where: {
                    login: { 
                        [Op.like]: `%${loginSubstring}%`, 
                    },
                },
                limit: Number(limit),
                order: [['login', 'ASC']],
            });
            res.send(foundUsers);
        }
    } else {
        const allUsers = await User.findAll({
            order: [['login', 'ASC']],
        });
        res.send(allUsers);
    }
});

// router.get('/', async (req, res) => {
//     try {
//         if (Object.keys(req.query).length === 2) {
//             const { loginSubstring, limit } = req.query;
//             if (loginSubstring && limit) {
//                 const foundUsers = await User.findAll({
//                     where: {
//                         login: {
//                             [Op.like]: `%${loginSubstring}%`,
//                         },
//                     },
//                     limit: Number(limit),
//                     // order: [['createdAt', 'DESC']],
//                 });
//                 res.send(foundUsers);
//             }
//         } else {
//             const allUsers = await User.findAll();
//             res.send(allUsers);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findAll({ where: { id }});
    res.send(foundUser);
});

router.post('/', async (req, res) => {
    const user = req.body;
    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error.message);
        res.send('Invalid request');
    } else {
        const newUser = await User.create({
            id: uuidv4(),
            login: user.login,
            password: user.password,
            age: user.age,
            isDeleted: false,
        });
  
        console.log('New user added');
        res.send('New user added');
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    const userToBeUpdated = await User.findByPk(id);
    if (!userToBeUpdated) {
        return res.status(404).send(`User with the ID ${id} not found`);
    }

    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error.message);
        return res.send('Invalid request');
    }
    if (login) userToBeUpdated.login = login;
    if (password) userToBeUpdated.password = password;
    if (age) userToBeUpdated.age = age;

    await userToBeUpdated.save();
    res.send(`User with the ID ${id} was updated`);
    
});

router.patch('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const userToBeUpdated = await User.findByPk(id);
  
    if (!userToBeUpdated) {
        return res.status(404).send(`User with the ID ${id} not found`);
    }
  
    userToBeUpdated.isDeleted = true;

    await userToBeUpdated.save();
  
    res.send(`User with the ID ${id} was deleted`);
});


export default router; 