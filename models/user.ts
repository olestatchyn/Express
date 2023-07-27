import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-access/postgreDB'

class User extends Model {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
    createdAt!: string;
    updatedAt!: string;
}
User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     login: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     isDeleted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE(6),
//         allowNull: true,
//         defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     updatedAt: {
//         type: DataTypes.DATE(6),
//         allowNull: true,
//         defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//   }, {
//     // Other model options go here
//   });

export default User;