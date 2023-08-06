import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import Group from '../models/group';

const router = express.Router();

const groupSchemaPost = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    permissions: Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()
});

const groupSchemaPatch = Joi.object({
    name: Joi.string().min(4).max(20),
    permissions: Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
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
    if (foundGroup.length == 0) {
        return res.send(`Group with the ID ${id} not found`);
    }
    res.send(foundGroup);
});

router.post('/', async (req, res) => {
    const group = req.body;
    const bodyValidation = groupSchemaPost.validate(req.body);

    if (bodyValidation.error) {
        console.log(bodyValidation.error.message);
        return res.send('Invalid request');
    }
    await Group.create({
        id: uuidv4(),
        name: group.name,
        permissions: group.permissions,
    });

    res.send('New group added');
});

router.patch('/:id', async (req, res) => {
    const bodyValidation = groupSchemaPatch.validate(req.body);

    if (bodyValidation.error) {
        console.log(bodyValidation.error.message);
        return res.send('Invalid request');
    }
 
    const { id } = req.params;
    let groupToBeUpdated = await Group.findByPk(id);

    if (!groupToBeUpdated) {
        return res.send(`Group with the ID ${id} not found`);
    }
    // groupToBeUpdated.dataValues = { ...groupToBeUpdated.dataValues, ...req.body };
    const { name, permissions } = req.body;
    if (name) groupToBeUpdated.name = name;
    if (permissions) groupToBeUpdated.permissions = permissions;
    
    if (groupToBeUpdated) await groupToBeUpdated.save();
    res.send(`Group with the ID ${id} was updated`);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const foundGroup = await Group.findOne({ where: { id }});

    if (!foundGroup) {
        return res.send(`Group with the ID ${id} not found`);
    }

    await foundGroup.destroy();

    res.send(`Group with the ID ${id} was destroyed`);
});

export default router; 