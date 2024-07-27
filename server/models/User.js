import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connect.js';
import bcrypt from 'bcrypt';

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
      len: [4, 20],
      notEmpty: true,
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
}, {
  hooks: {
    beforeCreate: async (newUserData) => {
      try {
        newUserData.email = await newUserData.email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        newUserData.password = await bcrypt.hash(newUserData.password, salt);
        return newUserData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    beforeUpdate: async (updatedUserData) => {
      try {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        if (updatedUserData.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, salt);
        }
        return updatedUserData;
      } catch (error) {
        console.error(error)
        throw error;
      }

    },
    beforeBulkCreate: async (newGroupData) => {
      try {
        for (let user of newGroupData) {
          user.email = await user.email.toLowerCase();
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
        return newGroupData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  sequelize,
  modelName: 'users',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});

export default User;