import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const steps = [
    {
      id: 0,
      title: 'Raw Materials',
      description: 'Gathering and preparing all necessary chemical components including castor oil, water, salts, and additives.',
      icon: '🧪',
      color: '#3b82f6'
    },
    {
      id: 1,
      title: 'Mixing',
      description: 'Combining ingredients in precise ratios with continuous stirring to ensure homogeneous mixture formation.',
      icon: '🌀',
      color: '#8b5cf6'
    },
    {
      id: 2,
      title: 'Heating',
      description: 'Controlled thermal processing to optimize chemical reactions and enhance product properties.',
      icon: '🔥',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Filtration',
      description: 'Removing impurities and undissolved particles to achieve clear, high-quality detergent solution.',
      icon: '⚗️',
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Final Product',
      description: 'Pure, effective liquid detergent ready for packaging and distribution.',
      icon: '✨',
      color: '#ec4899'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);

  return (
    <section id="process" className="py-32 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
            Workflow
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Production Process
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A systematic approach to liquid detergent manufacturing
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>

          <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            {[0.5, 1, 2].map((s) => (
              <motion.button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                  speed === s ? 'bg-purple-500 text-white' : 'text-white/60 hover:text-white'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {s}x
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </div>

          {/* Step Markers */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => { setCurrentStep(index); setIsPlaying(false); }}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${
                    index <= currentStep
                      ? 'border-transparent'
                      : 'border-white/20 bg-slate-800'
                  }`}
                  style={{
                    backgroundColor: index <= currentStep ? step.color : undefined,
                    boxShadow: index === currentStep ? `0 0 30px ${step.color}50` : undefined,
                  }}
                  animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {step.icon}
                </motion.div>
                <span className={`mt-3 text-sm font-medium transition-colors duration-300 hidden sm:block ${
                  index === currentStep ? 'text-white' : 'text-white/40'
                }`}>
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current Step Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative p-8 lg:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{ backgroundColor: `${steps[currentStep].color}20` }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {steps[currentStep].icon}
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-purple-400">Step {currentStep + 1}</span>
                  <span className="w-8 h-px bg-white/20" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {steps[currentStep].title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: steps[currentStep].color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Process;
