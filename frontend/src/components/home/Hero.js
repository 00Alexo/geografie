import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import { FaGlobeEurope, FaBook, FaMap, FaChalkboardTeacher } from 'react-icons/fa';

const Hero = ({ fadeIn, staggerContainer, iconVariants }) => {
  return (
    <ParallaxLayer
      offset={0}
      speed={0.5}
      factor={1}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '70px',
      }}
    >
      <motion.div 
        className="text-center max-w-5xl px-8 py-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="flex justify-center mb-8" variants={iconVariants}>
          <div className="h-24 w-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-[#5F5FDF]">
            <FaGlobeEurope className="text-6xl text-[#5F5FDF]" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-[#5F5FDF] text-6xl font-bold mb-6 tracking-wide"
          variants={fadeIn}
        >
          GeoExplorer
        </motion.h1>
        
        <motion.p 
          className="text-[#4747A9] text-2xl mb-8 mx-auto max-w-3xl"
          variants={fadeIn}
        >
          Pregătire pentru Bacalaureat la Geografie. 
          Resurse complete, exerciții interactive și hărți detaliate pentru succes.
        </motion.p>

        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={staggerContainer}
        >
          <motion.div 
            className="flex flex-col items-center" 
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="mb-6 h-16 w-16 rounded-full bg-[#5F5FDF] flex items-center justify-center shadow-lg"
              variants={iconVariants}
            >
              <FaBook className="text-2xl text-white" />
            </motion.div>
            <h3 className="font-bold text-[#5F5FDF] text-xl mb-3">Subiecte Bacalaureat</h3>
            <p className="text-[#4747A9] text-lg text-center">Probleme și rezolvări complete</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center" 
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="mb-6 h-16 w-16 rounded-full bg-[#5F5FDF] flex items-center justify-center shadow-lg"
              variants={iconVariants}
            >
              <FaMap className="text-2xl text-white" />
            </motion.div>
            <h3 className="font-bold text-[#5F5FDF] text-xl mb-3">WorldMap</h3>
            <p className="text-[#4747A9] text-lg text-center">Megalopolisuri mondiale</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center" 
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="mb-6 h-16 w-16 rounded-full bg-[#5F5FDF] flex items-center justify-center shadow-lg"
              variants={iconVariants}
            >
              <FaChalkboardTeacher className="text-2xl text-white" />
            </motion.div>
            <h3 className="font-bold text-[#5F5FDF] text-xl mb-3">Hărți Interactive</h3>
            <p className="text-[#4747A9] text-lg text-center">Materiale comprehensive</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </ParallaxLayer>
  );
};

export default Hero;