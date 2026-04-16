import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaCheckCircle, FaFlask, FaWater, FaStar } from 'react-icons/fa';

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Animated Counter
  const [counts, setCounts] = useState({ ph: 0, viscosity: 0, effectiveness: 0, clarity: 0 });

  useEffect(() => {
    if (!isInView) return;

    const targets = { ph: 7.2, viscosity: 450, effectiveness: 95, clarity: 98 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targets).map((key) => {
      const increment = targets[key] / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(intervals[Object.keys(targets).indexOf(key)]);
        }
        setCounts((prev) => ({ ...prev, [key]: current }));
      }, stepDuration);
    });

    return () => intervals.forEach(clearInterval);
  }, [isInView]);

  const stats = [
    { icon: <FaFlask />, label: 'pH Level', value: counts.ph.toFixed(1), unit: '', color: 'from-blue-400 to-cyan-500' },
    { icon: <FaWater />, label: 'Viscosity', value: Math.round(counts.viscosity), unit: 'cP', color: 'from-purple-400 to-indigo-500' },
    { icon: <FaCheckCircle />, label: 'Effectiveness', value: Math.round(counts.effectiveness), unit: '%', color: 'from-green-400 to-emerald-500' },
    { icon: <FaStar />, label: 'Clarity', value: Math.round(counts.clarity), unit: '%', color: 'from-pink-400 to-rose-500' },
  ];

  return (
    <section id="results" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Results & Properties
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Measured characteristics of the final detergent product
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative glass dark:glass-dark rounded-2xl p-8 text-center overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <motion.div
                className={`text-4xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent flex justify-center`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {stat.label}
              </h3>

              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}{stat.unit}
              </p>

              {/* Glow Effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 glass dark:glass-dark rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text text-center">
            Product Specifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <strong>Foam Quality:</strong> Excellent with stable bubbles
            </div>
            <div>
              <strong>Stability:</strong> No phase separation after 30 days
            </div>
            <div>
              <strong>Color:</strong> Clear to light yellow
            </div>
            <div>
              <strong>Odor:</strong> Pleasant, mild fragrance
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
