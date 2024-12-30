import { Sequelize } from 'sequelize';
import sequelize from './config/db.js';
import UserModel from './models/User.js';
import HabitModel from './models/Habit.js';

const User = UserModel(sequelize, Sequelize.DataTypes);
const Habit = HabitModel(sequelize, Sequelize.DataTypes);

Habit.associate({ User });

export { sequelize, User, Habit };
