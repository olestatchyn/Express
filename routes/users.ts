import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import { User } from  '../types';

const router = express.Router();

const schema = Joi.object({
    login: Joi.string().min(6).max(20).required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)/).required(),
    age: Joi.number().min(4).max(130).required()
});

let users: User[] = [
    {
        login: "Jon",
        password: "qwerty",
        age: 22,
        isDeleted: false,
        id: "8a75dcd5-b16f-433b-a8cf-024606d08bce"
    },
    {
        login: "Marry",
        password: "8123ey23",
        age: 60,
        isDeleted: false,
        id: "98801e33-e3ff-4b1e-b838-962d86b5922a"
    },
    {
        login: "Alex",
        password: "40ifd3jdc",
        age: 38,
        isDeleted: false,
        id: "cd46c28f-fd8a-4f65-98a9-9d385a0911c4"
    },
    {
        login: "Alex124",
        password: "j34f52f83",
        age: 38,
        isDeleted: false,
        id: "hg46c28f-fd8a-4f11-98a9-9d385a0911c4"
    },
    {
        login: "BossAlex",
        password: "34t53gr34",
        age: 38,
        isDeleted: false,
        id: "xx43c28f-fd8a-4f65-98a9-9d385a0911c4"
    }
];

router.get('/', (req, res) => {
    if(Object.keys(req.query).length > 0){
        const loginSubstring = req.query.loginSubstring as string;
        const limit = Number(req.query.limit);
        let foundUsers: typeof users = [];

        for(let found = 0, i = 0; found < limit && i < users.length; i++){
            if (users[i].login.includes(loginSubstring)){
                foundUsers.push(users[i]);
                found++;
            }
        }
        res.send(foundUsers);
    } else {
        res.send(users);
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser);
})

router.post('/', (req, res) => {
    const user = req.body;
    let {error} = schema.validate(req.body);

    if (error){

        console.log(error.message);
        res.send("Invalid request");

    } else {
        user.id = uuidv4();
        user.isDeleted = false;

        users.push(user);

        console.log("New user added");
        res.send("New user added");
    }
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    let userToBeUpdated = users.find((user) => user.id === id);

    if (!userToBeUpdated){
        throw new Error(`User with the ID ${id} not found`);
    }

    let {error, value} = schema.validate(req.body);

    if (error){
        console.log(error.message);
        res.send("Invalid request");
    } else {
        if(login) userToBeUpdated.login = login;
        if(password) userToBeUpdated.password = password;
        if(age) userToBeUpdated.age = age;

        res.send(`User with the ID ${id} was updated`);
    }
})

router.patch('/delete/:id', (req, res) => {
    const { id } = req.params;
    let userToBeUpdated = users.find((user) => user.id === id);

    if (!userToBeUpdated){
        throw new Error(`User with the ID ${id} not found`);
    }

    userToBeUpdated.isDeleted = true;

    res.send(`User with the ID ${id} was deleted`);
})

export default router; 