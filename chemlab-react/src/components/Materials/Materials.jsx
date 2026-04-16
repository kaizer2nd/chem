import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Materials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const materials = [
    {
      icon: '🫒',
      title: 'Castor Oil',
      description: 'Natural oil used as a base and emulsifier. Provides conditioning properties and foam stabilization.',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: '💧',
      title: 'Distilled H₂O',
      description: 'Purified water serves as the primary solvent for achieving desired concentration.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '⚪',
      title: 'Sodium Sulphate',
      description: 'Acts as a filler and bulking agent, improving product characteristics.',
      gradient: 'from-slate-400 to-slate-600'
    },
    {
      icon: '🧂',
      title: 'Sodium Chloride',
      description: 'Adjusts viscosity and improves cleaning efficiency of the formulation.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: '🔬',
      title: 'Sodium Carbonate',
      description: 'Alkaline builder that enhances cleaning power and water softening.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: '🧴',
      title: 'Glycerol',
      description: 'Humectant that improves product feel and prevents skin dryness.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="materials" className="py-32 px-4 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Background Gradient Orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-4 block">
            Components
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Materials Used
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Essential chemical components carefully selected for optimal detergent formulation
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {materials.map((material, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="relative p-6 lg:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 h-full cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon with gradient background */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${material.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {material.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {material.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {material.description}
                </p>

                {/* Hover indicator line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${material.gradient} rounded-b-2xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Materials;
