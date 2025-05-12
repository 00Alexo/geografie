import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCog, FaChartLine, FaSignOutAlt, FaBell, FaChevronDown } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSubjectsMenuOpen, setIsSubjectsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Close other menus when opening this one
        setIsProfileMenuOpen(false);
        setIsSubjectsMenuOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        // Close other menus when opening this one
        setIsMenuOpen(false);
        setIsSubjectsMenuOpen(false);
    };

    const toggleSubjectsMenu = () => {
        setIsSubjectsMenuOpen(!isSubjectsMenuOpen);
        // Close other menus when opening this one
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSubjectsMenuOpen && !event.target.closest('.subjects-dropdown')) {
                setIsSubjectsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSubjectsMenuOpen]);

    return (
        <nav className="fixed w-full h-[80px] bg-[#5f5fdf] shadow-md z-50 px-4 lg:px-8 flex items-center justify-between">
            {/* Logo & Navigation Items */}
            <div className="flex items-center gap-8">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center mb-2 focus:outline-none hover:opacity-80 transition-opacity text-white font-bold text-3xl"
                >
                    GeoExplorer
                </button>
                
                {/* Desktop Navigation Items */}
                <div className="hidden lg:flex items-center gap-6">
                    <p onClick={() => navigate('/worldMap')} className="text-[#EDE8F5] text-lg cursor-pointer hover:text-white transition-colors">WorldMap</p>
                    
                    {/* Subjects Dropdown - Desktop */}
                    <div className="relative subjects-dropdown">
                        <button 
                            onClick={toggleSubjectsMenu}
                            className="flex items-center text-[#EDE8F5] text-lg cursor-pointer hover:text-white transition-colors"
                        >
                            Subiecte
                            <FaChevronDown className={`ml-1 text-sm transition-transform ${isSubjectsMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isSubjectsMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                <Link 
                                    to="/subiecte/geografie"
                                    className="block px-4 py-2 text-[#3D52A0] hover:bg-gray-50"
                                    onClick={() => setIsSubjectsMenuOpen(false)}
                                >
                                    Geografie
                                </Link>
                                <div className="border-b border-gray-200 my-1"></div>
                                <Link 
                                    to="/subiecte/posteaza"
                                    className="block px-4 py-2 text-[#3D52A0] hover:bg-gray-50"
                                    onClick={() => setIsSubjectsMenuOpen(false)}
                                >
                                    Posteaza un subiect
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Right Side - User Controls */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ADBBDA] transition-all"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <FaTimes className="text-[#EDE8F5] text-xl" />
                    ) : (
                        <FaBars className="text-[#EDE8F5] text-xl" />
                    )}
                </button>
                
                {/* Sign In/Up Buttons (Desktop) */}
                {!user ?
                <div className="hidden md:flex gap-4">
                    <button 
                        onClick={() => navigate('/signin')}
                        className="px-4 py-2 bg-transparent text-[#EDE8F5] border border-[#EDE8F5] rounded-lg hover:bg-[#7091E6] active:bg-[#8697C4] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ADBBDA] focus:ring-opacity-50"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="px-4 py-2 bg-[#EDE8F5] text-[#3D52A0] border-none rounded-lg hover:bg-[#ADBBDA] active:bg-[#8697C4] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ADBBDA] focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                </div>
                : 
                <div className="relative">
                    <button 
                        onClick={toggleProfileMenu}
                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-[#7091E6] rounded-lg transition-all"
                    >
                        <p className="text-xl">{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}</p>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                            <button 
                                onClick={() => {
                                    logout();
                                }}
                                className="w-full text-left px-4 py-2 text-[#3D52A0] hover:bg-gray-50 flex items-center gap-2"
                            >
                                <FaSignOutAlt className="text-sm" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
                }
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-[80px] left-0 right-0 bg-[#3D52A0] p-4 shadow-lg md:hidden z-40 border-t border-[#7091E6]">
                    <div className="flex flex-col gap-3">
                        <Link to="/worldMap" className="text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all">WorldMap</Link>
                        
                        {/* Subjects Dropdown - Mobile */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsSubjectsMenuOpen(!isSubjectsMenuOpen)}
                                className="w-full text-left flex justify-between items-center text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all"
                            >
                                <span>Subiecte</span>
                                <FaChevronDown className={`transition-transform ${isSubjectsMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isSubjectsMenuOpen && (
                                <div className="pl-4 mt-2 border-l border-[#7091E6] ml-4">
                                    <Link 
                                        to="/subiecte/geografie" 
                                        className="block text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all"
                                    >
                                        Geografie
                                    </Link>
                                    <div className="border-b border-gray-200 my-1"></div>
                                    <Link 
                                        to="/subiecte/posteaza" 
                                        className="block text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all"
                                    >
                                        Posteaza un subiect
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        <div className="border-t border-[#7091E6] my-2 py-2">
                            <Link to="/profile" className="text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all flex items-center gap-2">
                                <FaUser /> My Profile
                            </Link>
                            <Link to="/settings" className="text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all flex items-center gap-2">
                                <FaCog /> Settings
                            </Link>
                            <Link to="/logout" className="text-[#EDE8F5] hover:text-white py-2 px-4 rounded-lg hover:bg-[#7091E6] transition-all flex items-center gap-2">
                                <FaSignOutAlt /> Logout
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <button 
                                onClick={() => navigate('/signin')}
                                className="px-4 py-2 bg-transparent text-[#EDE8F5] border border-[#EDE8F5] rounded-lg hover:bg-[#7091E6] active:bg-[#8697C4] transition-all focus:outline-none"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 bg-[#EDE8F5] text-[#3D52A0] border-none rounded-lg hover:bg-[#ADBBDA] active:bg-[#8697C4] transition-all focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;