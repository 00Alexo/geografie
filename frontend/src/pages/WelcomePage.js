import React, { useMemo, useRef } from 'react';
import { Parallax } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Resources from '../components/home/Resources';
import Background from '../components/home/Background';
import Navigation from '../components/home/Navigation';

const WelcomePage = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  
  // Color palette - using these colors but for a lighter theme
  const colors = {
    darkBlue: "#3D52A0",
    lightBlue: "#7091E6",
    darkGray: "#8697C4",
    lightGray: "#ADBBDA",
    primaryWhite: "#EDE8F5",
    lightBg: "#f5f7ff"  // Light background color
  };

  // Pre-compute random values for consistent rendering
  const stars = useMemo(() => [...Array(200)].map(() => ({
    fontSize: `${Math.random() * 14 + 4}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 400}%`, 
    animationDuration: `${Math.random() * 5 + 2}s`
  })), []);

  const shapes = useMemo(() => [...Array(40)].map(() => {
    const baseColor = Math.random() > 0.5 ? colors.lightBlue : colors.darkGray;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 400}%`, 
      rotate: `${Math.random() * 360}deg`,
      width: `${Math.random() * 120 + 50}px`,
      height: `${Math.random() * 120 + 50}px`,
      borderRadius: Math.random() > 0.5 ? '50%' : '0%',
      background: `${baseColor}${Math.floor(Math.random() * 50 + 30).toString(16)}`,
      opacity: Math.random() * 0.4 + 0.1
    };
  }), []);

  const floatingLines = useMemo(() => [...Array(40)].map(() => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 400}%`,
      width: `${Math.random() * 200 + 100}px`,
      height: `${Math.random() * 3 + 1}px`,
      rotate: `${Math.random() * 180}deg`,
      opacity: Math.random() * 0.15 + 0.05,
      color: Math.random() > 0.7 ? colors.darkBlue : (Math.random() > 0.5 ? colors.lightBlue : colors.darkGray),
      animationDuration: `${Math.random() * 15 + 10}s` // 10-25s duration for slow movement
    };
  }), []);

  // Add floating orbs - large blurred circles
  const floatingOrbs = useMemo(() => [...Array(30)].map(() => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 400}%`,
      size: `${Math.random() * 200 + 100}px`, // Large orbs
      opacity: Math.random() * 0.1 + 0.05, // Very subtle
      blur: `${Math.random() * 60 + 40}px`, // Blurry effect
      color: Math.random() > 0.5 ? colors.lightBlue : colors.darkBlue,
      animationDuration: `${Math.random() * 30 + 20}s` // Very slow animation
    };
  }), []);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6 
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <style jsx global>{`
        html, body {
          overflow: hidden;
        }
      `}</style>
      <style jsx>{`
        /* Hide scrollbar */
        :global(body::-webkit-scrollbar) {
          display: none;
        }

        :global(body) {
          -ms-overflow-style: none;
          scrollbar-width: none;
          background-color: ${colors.lightBg};
        }

        /* Star animation */
          @keyframes twinkle {
            0% { opacity: 0.4; }
            100% { opacity: 0.9; }
          }

          .star {
            position: absolute;
            animation: twinkle var(--duration) infinite alternate;
            color: ${colors.darkBlue};
          }
          
          /* Floating orb animation */
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(15px); }
            100% { transform: translateY(0) translateX(0); }
          }
          
          /* Line flow animation */
          @keyframes flow {
            0% { transform: translateX(-20px) rotate(var(--rotate)); opacity: var(--min-opacity); }
            50% { transform: translateX(20px) rotate(calc(var(--rotate) + 5deg)); opacity: var(--max-opacity); }
            100% { transform: translateX(-20px) rotate(var(--rotate)); opacity: var(--min-opacity); }
          }
        
        /* Content section styling */
        .content-section {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(5px);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          padding: 2rem;
        }
        
        .section-title {
          background: linear-gradient(90deg, ${colors.darkBlue}, ${colors.lightBlue});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Parallax ref={parallaxRef} pages={4} config={{ tension: 170, friction: 26 }}>
        {/* Background Elements */}
        <Background 
          stars={stars} 
          shapes={shapes} 
          floatingOrbs={floatingOrbs} 
          floatingLines={floatingLines}
          colors={colors}
        />
        
        {/* Content Sections */}
        <Hero 
          fadeIn={fadeIn} 
          staggerContainer={staggerContainer} 
          iconVariants={iconVariants} 
        />
        
        <Features 
          fadeIn={fadeIn} 
          staggerContainer={staggerContainer} 
          featureCardVariants={featureCardVariants} 
          iconVariants={iconVariants}
        />
        
        <HowItWorks 
          fadeIn={fadeIn} 
          iconVariants={iconVariants}
        />
        
        <Resources 
          fadeIn={fadeIn}
        />

        {/* Navigation */}
        <Navigation 
          parallaxRef={parallaxRef}
        />
      </Parallax>

      {/* Fixed action button */}
        <div className="fixed bottom-10 right-10 z-[9999]">
            <a 
                href="/product" 
                className="bg-[#5F5FDF] text-white px-10 py-5 rounded-xl text-xl font-medium hover:bg-[#4747A9] transition-all shadow-lg flex items-center"
            >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    </div>
  );
};

export default WelcomePage;