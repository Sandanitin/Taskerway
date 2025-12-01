import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Button from './ui/Button';

const Hero = () => {
    const scrollToServices = () => {
        const element = document.getElementById('services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-primary">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Get Anything Done with{' '}
                            <span className="relative inline-block">
                                Taskerway
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute bottom-2 left-0 h-3 bg-yellow-400 opacity-30"
                                />
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
                    >
                        From airport transfers to home services, find the help you need.
                        Professional, reliable, and available 24/7.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={scrollToServices}
                            icon={FiArrowRight}
                            className="text-primary bg-white hover:bg-gray-50"
                        >
                            Browse Services
                        </Button>
                        <a href="tel:0458717810">
                            <Button
                                size="lg"
                                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white"
                            >
                                Call Us Now
                            </Button>
                        </a>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                    >
                        {[
                            { icon: FiCheckCircle, text: '24/7 Available' },
                            { icon: FiCheckCircle, text: 'Professional Service' },
                            { icon: FiCheckCircle, text: 'Quick Response' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2 text-white/90"
                            >
                                <feature.icon className="w-5 h-5 text-yellow-300" />
                                <span className="font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="var(--gray-50)"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
