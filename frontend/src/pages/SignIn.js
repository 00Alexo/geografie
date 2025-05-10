import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMapMarkedAlt, FaCheck, FaTimes } from 'react-icons/fa';
import globe from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';
import { useSignin } from "../hooks/useSignin";
import { useAuthContext } from '../hooks/useAuthContext.js';
import NotFound from './NotFound.js';

const SignIn = () => {
    const vantaRef = useRef(null);
    useEffect(() => {
        let vantaEffect;
        if (vantaRef.current) {
            vantaEffect = globe({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x5F5FDF,
                color2: 0x312626,
                backgroundColor: 0xffffff
            });
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);
        
    const [showPassword, setShowPassword] = useState(false);

    const { user } = useAuthContext()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
    });
    const {signin, error, isLoading, errorFields} = useSignin();

    const checkPasswordStrength = (password) => {
        setPasswordStrength({
        length: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        signin(username, password);
    }

    if(user)
        return <NotFound/>
    
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#EDF8FD]">
            {/* Animation Side */}
            <div ref={vantaRef} className="flex-1 relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent z-10"></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 text-white max-w-md">
                    <div className='bg-white/90 p-6 rounded-lg shadow-lg max-w-[500px] w-[40vw] min-w-[400px]'>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-blue-600">Welcome Back</h1>
                            <p className="text-[#8697C4] mt-2">Sign in to your account</p>
                        </div>
                        
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                            <p>{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                Username or password
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="name"
                                name="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full px-4 py-2 bg-blue-50 border ${errorFields?.some(err => err.field === 'username') ? 'border-red-500' : 'border-blue-200'} rounded-md
                                focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400`}
                                placeholder="John Doe"
                                />
                            </div>
                            </div>
                            
                            <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                                Password
                                </label>
                                <Link to="/forgot-password" className="text-sm text-[#7091E6] hover:text-[#3D52A0]">
                                Forgot password?
                                </Link>
                            </div>
                            <div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            checkPasswordStrength(e.target.value); 
                                            setPassword(e.target.value)
                                        }}
                                        className={`w-full px-4 py-2 bg-blue-50 border ${errorFields?.some(err => err.field === 'pass') ? 'border-red-500' : 'border-blue-200'} rounded-md
                                        focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400`}
                                        placeholder="••••••••"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                            ) : (
                                            <FaEye className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                            <div className="flex items-center mb-6">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#7091E6] focus:ring-[#7091E6] border-[#ADBBDA] rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-[#5F5FDF] text-white py-3 rounded-lg hover:bg-[#7091E6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:ring-opacity-50 disabled:opacity-50"
                                disabled={isLoading}
                            >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-[#8697C4]">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-[#7091E6] hover:text-[#3D52A0] font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile form */}
            <div className="md:hidden w-full p-6 bg-[#EDF8FD]">
                <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#3D52A0]">Welcome Back</h1>
                        <p className="text-[#8697C4] mt-2">Sign in to your account</p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Username or password
                        </label>
                        <div className="relative">
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-4 py-2 bg-blue-50 border ${errorFields?.some(err => err.field === 'username') ? 'border-red-500' : 'border-blue-200'} rounded-md
                            focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400`}
                            placeholder="John Doe"
                            />
                        </div>
                        </div>
                        
                        <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                            Password
                            </label>
                            <Link to="/forgot-password" className="text-sm text-[#7091E6] hover:text-[#3D52A0]">
                            Forgot password?
                            </Link>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        checkPasswordStrength(e.target.value); 
                                        setPassword(e.target.value)
                                    }}
                                    className={`w-full px-4 py-2 bg-blue-50 border ${errorFields?.some(err => err.field === 'pass') ? 'border-red-500' : 'border-blue-200'} rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400`}
                                    placeholder="••••••••"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                        ) : (
                                        <FaEye className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                        </div>
                        
                        <div className="flex items-center mb-6">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[#7091E6] focus:ring-[#7091E6] border-[#ADBBDA] rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-[#5F5FDF] text-white py-3 rounded-lg hover:bg-[#7091E6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:ring-opacity-50 disabled:opacity-50"
                            disabled={isLoading}
                        >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                            Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-[#8697C4]">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#7091E6] hover:text-[#3D52A0] font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;