import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import logo from '/logo.png';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className='flex items-center justify-between h-full'>
                    {/* left */}
                    <Link to="/" className="hover:opacity-80 transition-all" >
                        <img src={logo} alt="logo" width={100} />
                    </Link>

                    {/* right */}
                    <div className='flex items-center gap-2'>
                        {authUser && (
                            <>
                                <Link to="/profile" className="btn btn-sm gap-2" >
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className='btn btn-sm gap-2' onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Navbar
