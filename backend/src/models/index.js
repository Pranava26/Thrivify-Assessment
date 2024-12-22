import Habit from "./habits.model.js";
import User from "./users.model.js";


User.hasMany(Habit, { foreignKey: 'user_id' });
Habit.belongsTo(User, { foreignKey: 'user_id' });

export { User, Habit };
