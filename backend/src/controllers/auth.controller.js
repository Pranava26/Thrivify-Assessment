import {User} from '../app.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js'

//signup controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generate jwt token
            generateToken(newUser.user_id, res);
            await newUser.save();

            res.status(201).json({
                user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        generateToken(user.user_id, res);

        res.status(200).json({
            user_id: user.user_id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateProfile = async (req, res) => {
    const { name, password } = req.body;
    const user_id = req.user.user_id;

    if (!name && !password) {
        return res.status(400).json({ message: "At least one field (name or password) is required" })
    }

    try {
        const user = await User.findOne({
            where: { user_id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        await user.update(updates);

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.log('Error in updateProfile controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}