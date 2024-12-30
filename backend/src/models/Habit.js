export default (sequelize, DataTypes) => {
    const Habit = sequelize.define(
        "Habit",
        {
            habit_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "User",
                    key: "user_id",
                },
                onDelete: "CASCADE",
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
                type: DataTypes.ENUM("daily", "weekly", "monthly"),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("Active", "Inactive", "Completed"),
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            freezeTableName: true,
        }
    );

    Habit.associate = (models) => {
        Habit.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
    };

    return Habit;
};  