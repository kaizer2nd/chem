import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaFlask, FaFire, FaThermometerHalf, FaBalanceScale } from 'react-icons/fa';

const Apparatus = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const apparatusItems = [
    {
      icon: <FaFlask className="text-5xl" />,
      title: 'Beakers & Flasks',
      description: 'Essential glassware for mixing and holding chemical solutions'
    },
    {
      icon: <FaFire className="text-5xl" />,
      title: 'Heating Equipment',
      description: 'Controlled heat sources for thermal processing'
    },
    {
      icon: <FaThermometerHalf className="text-5xl" />,
      title: 'Temperature Control',
      description: 'Precise monitoring and regulation of reaction temperatures'
    },
    {
      icon: <FaBalanceScale className="text-5xl" />,
      title: 'Measuring Tools',
      description: 'Accurate measurement devices for precise formulation'
    }
  ];

  return (
    <section id="apparatus" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Laboratory Apparatus
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apparatusItems.map((item, index) => (
            <motion.div
              key={index}
              className="group glass dark:glass-dark rounded-2xl p-6 text-center hover:shadow-glow transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <motion.div
                className="text-purple-500 mb-4 flex justify-center"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apparatus;
