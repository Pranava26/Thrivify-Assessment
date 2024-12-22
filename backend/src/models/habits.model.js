import { DataTypes } from "sequelize";
import { sequelize } from '../lib/db.js';

const Habit = sequelize.define('habits', {
  habit_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  habit_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  frequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Completed'),
    allowNull: false,
    defaultValue: 'Active',
  },
});

sequelize.sync();

export default Habit;
