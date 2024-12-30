import {Habit} from "../app.js";

export const createHabit = async (req, res) => {
    const { habit_title, frequency, status } = req.body;
    const user_id = req.user.user_id;

    if (!habit_title || !frequency) {
        return res.status(400).json({ message: "Habit title and frequency are required" });
    }

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const newHabit = await Habit.create({
            user_id,
            habit_title,
            frequency,
            status: status || "Active",
        });

        return res.status(201).json({ message: "Habit created successfully", habit: newHabit });

    } catch (error) {
        console.log("Error in createHabit controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserHabits = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const habits = await Habit.findAll({
            where: { user_id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        return res.status(200).json({ message: "Habits fetched successfully", habits });

    } catch (error) {
        console.log("Error in getUserHabits controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateHabit = async (req, res) => {
    const { id } = req.params;

    const { habit_title, frequency, status, start_date } = req.body;

    try {
        const habit = await Habit.findOne({
            where: { habit_id: id },
        });

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        await habit.update({
            ...(habit_title && { habit_title }),
            ...(frequency && { frequency }),
            ...(status && { status }),
            ...(start_date && { start_date }),
        });

        return res.status(200).json({
            message: "Habit updated successfully.",
            habit,
        });
    } catch (error) {
        console.error("Error in updateHabit controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteHabit = async (req, res) => {
    const { id } = req.params;

    try {
        const habit = await Habit.findOne({
            where: { habit_id: id },
        });

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        await Habit.destroy({
            where: { habit_id: id },
        });

        return res.status(200).json({ message: "Habit deleted successfully" });

    } catch (error) {
        console.log("Error in deleteHabit controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}