import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useHabitStore = create((set, get) => ({
    userHabits: [],
    isLoadingHabits: false,
    isManagingHabit: false,

    // Fetch all habits for the authenticated user
    fetchHabits: async () => {
        set({ isLoadingHabits: true });
        try {
            const res = await axiosInstance.get('/habits');
            set({ userHabits: res.data.habits });
        } catch (error) {
            console.error('Error fetching habits:', error);
            toast.error('Failed to fetch habits. Please try again.');
        } finally {
            set({ isLoadingHabits: false });
        }
    },

    // Add a new habit
    addHabit: async (habitData) => {
        set({ isManagingHabit: true });
        try {
            const res = await axiosInstance.post('/habits', habitData);
            set((state) => ({
                userHabits: [...state.userHabits, res.data.habit],
            }));
            toast.success('Habit added successfully!');
        } catch (error) {
            console.error('Error adding habit:', error);
            toast.error(error.response?.data?.message || 'Failed to add habit.');
        } finally {
            set({ isManagingHabit: false });
        }
    },

    // Update an existing habit
    updateHabit: async (habitId, updatedData) => {
        set({ isManagingHabit: true });
        try {
            const res = await axiosInstance.put(`/habits/${habitId}`, updatedData);
            set((state) => ({
                userHabits: state.userHabits.map((habit) =>
                    habit.habit_id === habitId ? res.data.habit : habit
                ),
            }));
            toast.success('Habit updated successfully!');
        } catch (error) {
            console.error('Error updating habit:', error);
            toast.error(error.response?.data?.message || 'Failed to update habit.');
        } finally {
            set({ isManagingHabit: false });
        }
    },

    // Delete a habit
    deleteHabit: async (habitId) => {
        set({ isManagingHabit: true });
        try {
            await axiosInstance.delete(`/habits/${habitId}`);
            set((state) => ({
                userHabits: state.userHabits.filter((habit) => habit.habit_id !== habitId),
            }));
            toast.success('Habit deleted successfully!');
        } catch (error) {
            console.error('Error deleting habit:', error);
            toast.error(error.response?.data?.message || 'Failed to delete habit.');
        } finally {
            set({ isManagingHabit: false });
        }
    },
}));
