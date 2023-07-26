import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import Group from '../models/group';

const router = express.Router();

const groupSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    permissions: Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()
});

router.get('/', async (req, res) => {
    const allGroups = await Group.findAll({
        order: [['name', 'ASC']],
    });
    res.send(allGroups);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundGroup = await Group.findAll({ where: { id }});
    if (!foundGroup) {
        return res.send(`Group with the ID ${id} not found`);
    }
    res.send(foundGroup);
});

router.post('/', (req, res) => {
    const group = req.body;
    const { error } = groupSchema.validate(req.body);

    if (error) {
        console.log(error.message);
        res.send('Invalid request');
    } else {
        Group.create({
            id: uuidv4(),
            name: group.name,
            permissions: group.permissions,
        });
  
        console.log('New group added');
        res.send('New group added');
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, permissions} = req.body;
    const groupToBeUpdated = await Group.findByPk(id);
    if (!groupToBeUpdated) {
        return res.status(404).send(`Group with the ID ${id} not found`);
    }

    const { error } = groupSchema.validate(req.body);

    if (error) {
        console.log(error.message);
        return res.send('Invalid request');
    }
    groupToBeUpdated.name = name;
    groupToBeUpdated.permissions = permissions;

    await groupToBeUpdated.save();
    res.send(`Group with the ID ${id} was updated`);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const foundGroup = await Group.findOne({ where: { id }});

    if (!foundGroup) {
        return res.send(`Group with the ID ${id} not found`);
    }

    await foundGroup.destroy();

    res.send(foundGroup);
});

export default router; 