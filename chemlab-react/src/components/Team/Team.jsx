import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const teamMembers = [
    { initials: 'RB', name: 'Rakshit Bankar', rollNo: '46' },
    { initials: 'JI', name: 'Jayesh Iwnate', rollNo: '57' },
    { initials: 'RP', name: 'Ritesh Paul', rollNo: '55' },
    { initials: 'JP', name: 'Jaykumar Patil', rollNo: '45' },
    { initials: 'SV', name: 'Sanket Viranak', rollNo: '55' },
  ];

  return (
    <section id="team" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h2>

        {/* Team Photo */}
        <motion.div
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img
            src="/team-lab.jpg"
            alt="Chemical Engineering Team"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="text-center glass dark:glass-dark rounded-2xl p-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Chemical Engineering Department
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            This project was developed by a dedicated team of chemical engineering students focused on industrial detergent formulation and process optimization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="rounded-2xl bg-white/80 dark:bg-white/10 border border-gray-200/60 dark:border-white/10 p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                  {member.initials}
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                  {member.name}
                </h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Roll No: {member.rollNo}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-purple-600 dark:text-purple-300 font-semibold">
                  Team Member
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-2">© 2024 ChemLab - Chemical Prototyping Project</p>
          <p className="text-sm">Built with React, Vite, Tailwind CSS, and Framer Motion</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Team;
