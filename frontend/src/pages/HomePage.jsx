import React, { useEffect, useState } from 'react';
import { useHabitStore } from '../store/useHabitStore';
import cardBg from '../assets/card-bg.jpg';
import axios from 'axios';

const HomePage = () => {
  const { fetchHabits, userHabits, updateHabit, addHabit, deleteHabit } = useHabitStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [formData, setFormData] = useState({
    habit_title: '',
    frequency: '',
    status: '',
  });

  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    fetchHabits();
    fetchHabitSuggestions();
  }, [fetchHabits]);

  const fetchHabitSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const res = await axios.get('http://localhost:5000/generate-habit-suggestions');
      console.log(res);
      
      setSuggestions(res.data);
    } catch (error) {
      console.log('Error fetching habit suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }

  const handleAddSuggestion = async (habit) => {
    await addHabit({
      habit_title: habit.title,
      frequency: 'daily',
      status: 'Active'
    });
  }

  const handleEditClick = (habit) => {
    setIsEditing(true);
    setSelectedHabit(habit);
    setFormData({
      habit_title: habit.habit_title,
      frequency: habit.frequency,
      status: habit.status,
    });
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setSelectedHabit(null);
    setFormData({
      habit_title: '',
      frequency: '',
      status: '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (isEditing && selectedHabit) {
      await updateHabit(selectedHabit.habit_id, formData);
      setIsModalOpen(false);
    }
  };

  const handleCreate = async () => {
    if (!isEditing) {
      await addHabit(formData);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-screen px-4">
      <div className="mt-24">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-black">
          <h1 className="text-3xl font-bold">Your Habits</h1>
          <button className="btn btn-success text-white btn-sm" onClick={handleAddNewClick}>
            Add new +
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {userHabits.length > 0 ? (
            userHabits.map((habit) => (
              <div key={habit.habit_id} className="card mx-auto bg-base-100 image-full w-96 shadow-xl">
                <figure>
                  <img src={cardBg} alt="card-bg" />
                </figure>
                <div className="card-body font-semibold">
                  <h2 className="card-title">{habit.habit_title}</h2>
                  <p>Frequency: {habit.frequency}</p>
                  <p>
                    Status: <span className="text-green-400">{habit.status}</span>
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm" onClick={() => handleEditClick(habit)}>
                      Edit
                    </button>
                    <button className="btn btn-error btn-sm text-white" onClick={() => deleteHabit(habit.habit_id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 font-semibold">No habits found. Start creating some!</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {isEditing ? 'Edit Habit' : 'Create New Habit'}
            </h3>
            <div className="py-4">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Habit Title</span>
                </label>
                <input
                  type="text"
                  name="habit_title"
                  value={formData.habit_title}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Frequency</span>
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-sm" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={isEditing ? handleSave : handleCreate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Habit suggestions section */}
      <div className='mt-16'>
        <h2 className='text-2xl font-bold mb-4 pb-4 border-b-2 border-black'>AI-Powered Habit Suggestions</h2>
        {isLoadingSuggestions ? (
          <p className='font-semibold mt-4'>Loading suggestions...</p>
        ) : suggestions.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {suggestions.map((suggestion, index) => (
              <div key={index} className='card mx-auto bg-gray-100 w-96 shadow-md p-4'>
                <h3 className='text-lg font-bold'>{suggestion.title}</h3>
                <p className='text-sm text-gray-600'>{suggestion.description}</p>
                <button onClick={() => handleAddSuggestion(suggestion)} className='btn btn-primary btn-sm mt-4'>Add to My Habits</button>
              </div>
            ))}
          </div>
        ) : (
          <p className='font-semibold mt-4'>No suggestions available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;