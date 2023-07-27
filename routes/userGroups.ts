import express from 'express';
import sequelize from '../data-access/postgreDB'
import User from '../models/user';
import Group from '../models/group';
import UserGroup from '../models/userGroup';

const router = express.Router();

router.post('/', async (req, res) => {
    if (Object.keys(req.body).length === 2) {
        const { UserId, GroupId } = req.body;
        const t = await sequelize.transaction();
        const foundUser = await User.findOne({ where: { id: UserId } });
        const foundGroup = await Group.findOne({ where: { id: GroupId } });

        if (!foundUser || !foundGroup) {
            await t.rollback();
            return res.send('IDs are incorrect');
        }
        const existingRecord = await UserGroup.findOne({ 
            where: { UserId: foundUser.id, GroupId: foundGroup.id },
            transaction: t,
        });

        if (existingRecord) {
            await t.rollback();
            return res.send('Record already exists');
        }

        await UserGroup.create({ UserId: foundUser.id, GroupId: foundGroup.id });

        await t.commit();
        return res.send('Record created successfully');
    }
});

export default router; 