import { Eye, EyeOff, Lock, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name,
    password: ''
  })

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Change Your Name
              </div>
              <input
                type="text"
                className={`input input-bordered w-full`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Lock className="h-4 w-4" />
                Change Password
              </div>
              <div className='relative'>
                <input type={showPassword ? "text" : "password"} className={`input input-bordered w-full`} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type='submit' className='btn btn-success text-white btn-sm'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
