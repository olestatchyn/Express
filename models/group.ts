import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-access/postgreDB';
import GroupPermissions from './permissions';

class Group extends Model {
    id!: string;
    name!: string;
    permissions!: Array<GroupPermissions>;
    createdAt!: string;
    updatedAt!: string;
}
Group.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE(6),
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE(6),
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
  {
    sequelize,
  }
);

export default Group;