import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare, FiHeadphones } from 'react-icons/fi';

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

                {/* Contact Form and Additional Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">First Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Subject</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea 
                                    rows="5" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Additional Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
                        <p className="text-gray-600 mb-8">
                            Our customer support team is ready to assist you with any questions or concerns. 
                            Whether you need help booking a service, have a question about our offerings, 
                            or want to provide feedback, we're here for you.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                {
                                    icon: FiMessageSquare,
                                    title: 'Quick Responses',
                                    description: 'We typically respond to inquiries within 2 hours during business hours.'
                                },
                                {
                                    icon: FiHeadphones,
                                    title: '24/7 Support',
                                    description: 'Our customer service is available around the clock for urgent matters.'
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mr-4 flex-shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 p-6 bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
                            <h4 className="font-bold text-xl mb-2">Emergency Service</h4>
                            <p className="mb-4">For urgent matters outside business hours, call our emergency line:</p>
                            <a href="tel:0458717810" className="text-xl font-bold underline">
                                0458 717 810
                            </a>
                        </div>
                    </div>
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
                    <p className="text-gray-600 mb-6">Stay connected and get the latest updates</p>
                    <div className="flex justify-center gap-4">
                        {['Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                            <div
                                key={platform}
                                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
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