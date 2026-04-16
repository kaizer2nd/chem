import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaFlask, FaCogs } from 'react-icons/fa';

const Introduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: <FaFlask className="text-4xl" />,
      title: 'Liquid Detergent Overview',
      content: 'Liquid detergents are cleaning agents composed of surfactants and other chemical compounds. They are widely used in household and industrial cleaning applications due to their effectiveness in removing dirt, grease, and stains from various surfaces.'
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: 'Chemical Engineering Process',
      content: 'Chemical engineering plays a crucial role in the detection and formulation of detergent products. Engineers analyze chemical compositions, test stability, and ensure product quality through various analytical methods.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="introduction" className="py-32 px-4 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-4 block">
            Overview
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Introduction
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="relative p-8 lg:p-10 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white mb-6"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {card.icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  {card.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {card.content}
                </p>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
