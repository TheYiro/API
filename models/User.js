import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import bcrypt from 'bcrypt'

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword(value) {
          // Validación personalizada para asegurar que la contraseña cumpla con los requerimientos
          if (!/\d/.test(value) || !/[a-zA-Z]/.test(value) || value.length < 8) {
            throw new Error('La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número y una letra.');
          }
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'Users',
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      }
    }
  });

export default User;
