import React from 'react';
import { motion } from 'framer-motion';
import { FiClipboard, FiPhone, FiSend, FiCheckCircle } from 'react-icons/fi';

const HowItWorks = () => {
    const steps = [
        {
            icon: FiClipboard,
            title: 'Submit Your Details',
            description: 'Fill out our simple registration form with your arrival information and service needs',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: FiPhone,
            title: 'We Contact You',
            description: 'Our team reaches out within 24 hours to confirm details and answer any questions',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            icon: FiSend,
            title: 'Airport Pickup',
            description: 'We pick you up from the airport and help you get settled in your temporary accommodation',
            color: 'from-green-500 to-teal-600'
        },
        {
            icon: FiCheckCircle,
            title: 'Get Started',
            description: 'We help you sign up for job platforms and provide ongoing support as you settle in',
            color: 'from-orange-500 to-red-600'
        }
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Getting started is easy! Just follow these simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Connector Line (hidden on mobile, shown on larger screens) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
                            )}

                            {/* Step Card */}
                            <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 z-10">
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                                    <step.icon className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline View for Mobile */}
                <div className="lg:hidden mt-8 max-w-md mx-auto">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-600 to-orange-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
