import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTruck, FiHome, FiBriefcase, FiMapPin, FiHeadphones } from 'react-icons/fi';

const WhatsIncluded = () => {
    const features = [
        {
            icon: FiClock,
            title: '24/7 Airport Pickup',
            description: 'No matter when your flight lands, we\'ll be there to pick you up',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: FiTruck,
            title: 'Comfortable Transport',
            description: 'Clean, air-conditioned vehicles with plenty of space for your luggage',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            icon: FiHome,
            title: 'Budget-Friendly Stay',
            description: 'Safe, clean temporary accommodation near universities and transport',
            color: 'from-green-500 to-teal-600'
        },
        {
            icon: FiBriefcase,
            title: 'Job Platform Setup',
            description: 'Help signing up for Uber Eats, DoorDash, Menulog, and more',
            color: 'from-orange-500 to-red-600'
        },
        {
            icon: FiMapPin,
            title: 'Local Orientation',
            description: 'Guide to local shops, transport, and essential services in your area',
            color: 'from-pink-500 to-rose-600'
        },
        {
            icon: FiHeadphones,
            title: 'Ongoing Support',
            description: 'WhatsApp support in Hindi and English throughout your transition',
            color: 'from-indigo-500 to-purple-600'
        }
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What's <span className="gradient-text">Included</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need for a smooth arrival and successful start in Australia
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-lg bg-gradient-to-r ${feature.color} text-white shadow-md`}>
                                <feature.icon className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>

                            {/* Check Mark */}
                            <div className="mt-4 flex items-center text-green-600">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-semibold">Included</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-bold mb-4">Need Something Else?</h3>
                    <p className="text-lg mb-6 opacity-90">
                        We can customize our services to match your specific needs. Just let us know in the registration form!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">Bank Account Setup</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">SIM Card Assistance</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">University Orientation</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">Shopping Tours</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatsIncluded;
