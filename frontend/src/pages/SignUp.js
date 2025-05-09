import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMapMarkedAlt } from 'react-icons/fa';
import globe from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';

const SignUp = () => {
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
                color: 0x0e2cc5,
                color2: 0x312626,
                backgroundColor: 0xffffff
            });
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
        
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    };
        
    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle form submission here
        alert('Form submitted successfully!');
    };
    
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#EDF8FD]">
            {/* Animation Side */}
            <div ref={vantaRef} className="flex-1 relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent z-10"></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 text-white max-w-md">
                    <div className='bg-white/90 p-6 rounded-lg shadow-lg max-w-[500px] w-[40vw] min-w-[400px] backdrop-blur-sm'>
                        <div className="flex items-center justify-center mb-6">
                            <FaUserAlt className="text-blue-600 mr-2" size={24} />
                            <h2 className="text-4xl font-bold text-blue-600">Create Account</h2>
                        </div>
                        
                        <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                            </label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                            placeholder="John Doe"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                            placeholder="you@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                            </label>
                            <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
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
                        
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                            </label>
                            <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                placeholder="••••••••"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                ) : (
                                <FaEye className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                            </div>
                        </div>
                        
                        <div>
                            <div
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm mt-8
                            font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
                            >
                            Sign Up
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
                                Log in
                            </Link>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile form */}
            <div className="md:hidden w-full p-6 bg-[#EDF8FD]">
                <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="flex items-center justify-center mb-6">
                        <FaUserAlt className="text-blue-600 mr-2" size={20} />
                        <h2 className="text-2xl font-bold text-blue-600">Create Account</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Name field */}
                        <div>
                            <label htmlFor="mobile-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="mobile-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                placeholder="John Doe"
                            />
                        </div>
                        
                        {/* Email field */}
                        <div>
                            <label htmlFor="mobile-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="mobile-email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                placeholder="you@example.com"
                            />
                        </div>
                        
                        {/* Password fields */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="mobile-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="mobile-password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
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
                            
                            <div>
                                <label htmlFor="mobile-confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="mobile-confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm mt-6
                            font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
                        >
                            Sign Up
                        </div>
                        
                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;