import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import { FaBook, FaMap, FaGlobeEurope, FaRegChartBar, FaChalkboardTeacher, FaDesktop } from 'react-icons/fa';

const Features = ({ fadeIn, staggerContainer, featureCardVariants, iconVariants }) => {
  return (
    <ParallaxLayer
      offset={1}
      speed={0.6}
      factor={1}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="max-w-6xl w-full px-8 py-16 content-section relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="bg-[#5F5FDF] text-white text-lg px-6 py-2 rounded-full uppercase tracking-wider shadow-sm">Resurse</span>
          <h2 className="section-title text-5xl font-bold mt-6 mb-6">Materiale Complete pentru Bacalaureat</h2>
          <p className="text-[#8697C4] text-xl max-w-3xl mx-auto">
            Platforma noastră oferă toate resursele necesare pentru pregătirea examenului de Bacalaureat la Geografie.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaBook className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">AutoGrader</h3>
            <p className="text-[#8697C4] text-lg">Colecție completă de variante de subiecte corectate automat de inteligenta artificiala.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaMap className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">Hărți Interactive</h3>
            <p className="text-[#8697C4] text-lg">Hărți digitale ce pot fi explorate pentru a învăța geografia României și a lumii.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaGlobeEurope className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">Megalopolisuri</h3>
            <p className="text-[#8697C4] text-lg">Explorează marile aglomerări urbane ale lumii cu informații detaliate și statistici.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaRegChartBar className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">Statistici și Grafice</h3>
            <p className="text-[#8697C4] text-lg">Date statistice și reprezentări grafice pentru a analiza rezultatele si pregatirea ta.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaChalkboardTeacher className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">Profile ale utilizatorilor</h3>
            <p className="text-[#8697C4] text-lg">Urmărește-ți progresul la Geografie și descoperă cum se descurcă și alți colegi. </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 hover:shadow-xl transition duration-300 border border-[#ADBBDA] border-opacity-50"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-16 w-16 rounded-lg bg-[#5F5FDF] flex items-center justify-center mb-6 shadow-sm"
              variants={iconVariants}
            >
              <FaDesktop className="text-2xl text-white" />
            </motion.div>
            <h3 className="text-[#5F5FDF] text-2xl font-bold mb-3">Teste Online</h3>
            <p className="text-[#8697C4] text-lg">Evaluează-ți cunoștințele cu teste interactive care simulează situații de examen real.</p>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxLayer>
  );
};

export default Features;