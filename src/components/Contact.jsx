import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
    const contactInfo = [
        {
            icon: FiPhone,
            title: 'Phone',
            value: '0458 717 810',
            href: 'tel:0458717810',
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            icon: FiMail,
            title: 'Email',
            value: 'support@taskerway.com.au',
            href: 'mailto:support@taskerway.com.au',
            gradient: 'from-purple-500 to-indigo-600',
        },
        {
            icon: FiMapPin,
            title: 'Address',
            value: 'Postbox address - Coming Soon',
            gradient: 'from-green-500 to-teal-600',
        },
        {
            icon: FiClock,
            title: 'Business Hours',
            value: 'Available 24/7',
            subtitle: 'Weekend service upon request',
            gradient: 'from-orange-500 to-red-600',
        },
    ];

    return (
        <section id="contact" className="section bg-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Get In <span className="gradient-text">Touch</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Have questions? We're here to help 24/7
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative"
                        >
                            {item.href ? (
                                <a href={item.href} className="block">
                                    <div className="card text-center group">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${item.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 font-medium">{item.value}</p>
                                        {item.subtitle && (
                                            <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                                        )}
                                    </div>
                                </a>
                            ) : (
                                <div className="card text-center">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 font-medium">{item.value}</p>
                                    {item.subtitle && (
                                        <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Social Media Placeholders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                    <p className="text-gray-600 mb-6">Social media links coming soon!</p>
                    <div className="flex justify-center gap-4">
                        {['Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                            <div
                                key={platform}
                                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"
                                title={`${platform} - Coming Soon`}
                            >
                                <span className="text-2xl">•</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
