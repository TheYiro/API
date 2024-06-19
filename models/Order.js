import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import User from "./User.js";

const Order = sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", 
      },
    },
    {
      timestamps: false,
      tableName: "Orders",
    }
  );

Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
  });
  Order.hasMany(models.OrderItem, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
  });
};

Order.belongsTo(User, { foreignKey: "user_id" });

export default Order;
