import User from './user';
import Group from './group';
import sequelize from '../data-access/postgreDB'
import { DataTypes } from 'sequelize';

const UserGroup = sequelize.define('UserGroup', {
    GroupId: {
      type: DataTypes.STRING,
      references: {
        model: Group,
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE',
    }
}, {
  timestamps: false
});

User.belongsToMany(Group, {through: "UserGroup"});
Group.belongsToMany(User, {through: "UserGroup"});

export default UserGroup;