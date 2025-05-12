import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';

const HowItWorks = ({ fadeIn, iconVariants }) => {
  return (
    <ParallaxLayer
      offset={2}
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
          <span className="bg-[#5F5FDF] text-white text-lg px-6 py-2 rounded-full uppercase tracking-wider shadow-sm">Cum Funcționează</span>
          <h2 className="section-title text-5xl font-bold mt-6 mb-6">Calea Spre Succes la Bacalaureat</h2>
          <p className="text-[#8697C4] text-xl max-w-3xl mx-auto">
            Platforma noastră oferă un parcurs structurat pentru a te ajuta să obții rezultate excelente la examenul de Bacalaureat.
          </p>
        </motion.div>

        {/* Steps section */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#ADBBDA] transform -translate-x-1/2"></div>

          {/* Step 1 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="md:w-1/2 md:pr-16 text-right">
              <h3 className="text-[#5F5FDF] text-3xl font-bold mb-4">Creează un Cont</h3>
              <p className="text-[#8697C4] text-xl">Înregistrează-te gratuit pentru a avea acces la toate resursele și pentru a-ți salva progresul.</p>
            </div>
            <motion.div 
              className="rounded-full bg-[#5F5FDF] text-white h-16 w-16 flex items-center justify-center font-bold text-2xl my-4 md:my-0 z-10 shadow-lg"
              variants={iconVariants}
            >
              1
            </motion.div>
            <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
            <motion.div 
              className="rounded-full bg-[#5F5FDF] text-white h-16 w-16 flex items-center justify-center font-bold text-2xl my-4 md:my-0 z-10 shadow-lg"
              variants={iconVariants}
            >
              2
            </motion.div>
            <div className="md:w-1/2 md:pl-16">
              <h3 className="text-[#5F5FDF] text-3xl font-bold mb-4">Explorează Materialele</h3>
              <p className="text-[#8697C4] text-xl">Accesează lecții, hărți interactive și exerciții pentru a-ți consolida cunoștințele de geografie.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="md:w-1/2 md:pr-16 text-right">
              <h3 className="text-[#5F5FDF] text-3xl font-bold mb-4">Exersează cu Teste</h3>
              <p className="text-[#8697C4] text-xl">Rezolvă subiecte de Bacalaureat din anii anteriori și teste create special pentru evaluare.</p>
            </div>
            <motion.div 
              className="rounded-full bg-[#5F5FDF] text-white h-16 w-16 flex items-center justify-center font-bold text-2xl my-4 md:my-0 z-10 shadow-lg"
              variants={iconVariants}
            >
              3
            </motion.div>
            <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
            <motion.div 
              className="rounded-full bg-[#5F5FDF] text-white h-16 w-16 flex items-center justify-center font-bold text-2xl my-4 md:my-0 z-10 shadow-lg"
              variants={iconVariants}
            >
              4
            </motion.div>
            <div className="md:w-1/2 md:pl-16">
              <h3 className="text-[#5F5FDF] text-3xl font-bold mb-4">Obține Rezultate Excelente</h3>
              <p className="text-[#8697C4] text-xl">Cu ajutorul resurselor noastre, vei fi pregătit să obții nota dorită la examenul de Bacalaureat.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </ParallaxLayer>
  );
};

export default HowItWorks;