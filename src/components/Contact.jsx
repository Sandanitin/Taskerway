import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare, FiHeadphones, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { sendContactFormEmail } from '../utils/emailService';

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

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Combine first and last name
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();

            // Prepare data for email service with proper formatting
            const emailData = {
                name: fullName || 'Anonymous',
                email: formData.email || 'noreply@example.com',
                serviceType: 'Contact Form Inquiry',
                phone: 'Not provided',
                address: '',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                description: (formData.message || '').trim(),
                budget: '',
                subject: (formData.subject || 'General Inquiry').trim(),
                // For contact forms, we need to set this to "true" to show contact section
                is_contact_form: 'true'
            };

            console.log('Sending contact form email with data:', emailData);

            // Send email using the contact form service
            const result = await sendContactFormEmail(emailData);
            console.log('Contact form email sent:', result);

            // Check if this was a mock response
            if (result && result.mock) {
                console.warn('Email was sent via mock service, not real EmailJS. Check console for EmailJS errors.');
                setSubmitStatus({
                    type: 'warning',
                    message: 'Message sent successfully! (Note: Email service is in test mode. For real emails, please contact support to configure EmailJS properly.)'
                });
            } else {
                setSubmitStatus({
                    type: 'success',
                    message: 'Message sent successfully! We\'ll get back to you soon.'
                });
            }

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to send message. Please try again or call us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>

                            {/* Submit status message */}
                            {submitStatus && (
                                <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' :
                                    submitStatus.type === 'error' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
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
                        {[
                            { name: 'Facebook', icon: FiFacebook, href: 'https://www.facebook.com/share/14NnK4qhDR9/?mibextid=wwXIfr' },
                            { name: 'Instagram', icon: FiInstagram, href: 'https://www.instagram.com/taskerway?igsh=MXMzMm4xOWVzZDh4aA==' },
                            { name: 'LinkedIn', icon: FiLinkedin, href: '#' }
                        ].map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                title={platform.name}
                            >
                                <platform.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div >
        </section >
    );
};

export default Contact;