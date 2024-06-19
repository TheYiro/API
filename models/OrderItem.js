import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import Order from "./Order.js";
import Product from "./Product.js";


const OrderItem = sequelize.define(
  "OrderItem",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "OrderItems",
  }
);

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

export default OrderItem;
