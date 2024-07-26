import { Model , DataTypes } from 'sequelize';
import sequelize from '../config/connect';
import bcrypt from 'bcrypt';

class User extends Model{}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 30],
      notEmpty: true
  }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
  }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 40],
      notEmpty: true
  }
  }
},{
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.email = await newUserData.email.toLowerCase();
      newUserData.username = await newUserData.username.toLowerCase();
      const salt = bcrypt.genSalt(10);
      newUserData.password = bcrypt.hash(newUserData.password, salt);
      return newUserData;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.email = await updatedUserData.email.toLowerCase();
      updatedUserData.username = await updatedUserData.username.toLowerCase();
      if (updatedUserData.changed('password')) {
        const salt = bcrypt.genSalt(10);
        updatedUserData.password = bcrypt.hash(updatedUserData.password, salt);
      }
      return updatedUserData;
    },
  },
  sequelize, 
  modelName: 'user',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});

export default {User}