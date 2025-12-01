import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiClock, FiShield } from 'react-icons/fi';

const About = () => {
    const stats = [
        { icon: FiUsers, label: 'Happy Customers', value: '10,000+' },
        { icon: FiAward, label: 'Professional Services', value: '50+' },
        { icon: FiClock, label: 'Years of Experience', value: '5+' },
        { icon: FiShield, label: 'Insured & Verified', value: '100%' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            About Taskerway
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            We&apos;re dedicated to providing exceptional service solutions that make your life easier
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Taskerway was founded with a simple mission: to connect people with reliable, professional services they can trust. 
                                We saw a gap in the market for a service platform that combines quality, convenience, and affordability.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                We&apos;re proud to serve thousands of customers across multiple service categories, 
                                from airport transfers to home maintenance, always maintaining our commitment to excellence.
                            </p>
                            <p className="text-lg text-gray-600">
                                Our team of dedicated professionals works around the clock to ensure you get the service you need, 
                                when you need it.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl font-bold text-white">TW</span>
                                    </div>
                                    <p className="text-gray-600">Professional Service Since 2019</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Achievements
                        </h2>
                        <p className="text-lg text-gray-600">
                            Numbers that speak volumes about our commitment to excellence
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600">
                            The principles that guide everything we do
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for excellence in every service we provide, ensuring quality and satisfaction.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust</h3>
                            <p className="text-gray-600">
                                Building trust through transparency, reliability, and consistent high-quality service.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency</h3>
                            <p className="text-gray-600">
                                Delivering prompt and efficient services that respect your time and exceed expectations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
