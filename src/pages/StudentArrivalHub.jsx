import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiHome, FiBriefcase, FiUserPlus, FiCheck, FiPhone } from 'react-icons/fi';
import StudentRegistrationForm from '../components/StudentRegistrationForm';
import HowItWorks from '../components/student-arrival/HowItWorks';
import WhatsIncluded from '../components/student-arrival/WhatsIncluded';
import PricingSection from '../components/student-arrival/PricingSection';
import FAQSection from '../components/student-arrival/FAQSection';
import WhatsAppButton from '../components/WhatsAppButton';

const StudentArrivalHub = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState('complete');

    const handleCTAClick = (service) => {
        setSelectedService(service);
        setShowForm(true);
        // Scroll to form
        setTimeout(() => {
            document.getElementById('registration-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const ctaButtons = [
        {
            id: 'pickup',
            title: 'Book Airport Pickup',
            icon: FiSend,
            gradient: 'from-blue-500 to-cyan-600',
            description: 'Get picked up from the airport'
        },
        {
            id: 'accommodation',
            title: 'Request Temporary Accommodation',
            icon: FiHome,
            gradient: 'from-green-500 to-teal-600',
            description: 'Find a place to stay'
        },
        {
            id: 'job',
            title: 'Get Job Signup Help',
            icon: FiBriefcase,
            gradient: 'from-purple-500 to-indigo-600',
            description: 'Start earning right away'
        },
        {
            id: 'complete',
            title: 'Complete Student Registration',
            icon: FiUserPlus,
            gradient: 'from-orange-500 to-red-600',
            description: 'Get all services together',
            featured: true
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="container-custom relative z-10 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                            🎓 Especially for International Students
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
                        >
                            Welcome to Australia! 🇦🇺
                            <br />
                            <span className="text-yellow-300">We've Got You Covered</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
                        >
                            From airport pickup to finding your first job, we help Indian students settle smoothly in Australia.
                            No stress, just support every step of the way.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center gap-4 text-white/90"
                        >
                            <div className="flex items-center gap-2">
                                <FiCheck className="w-5 h-5 text-yellow-300" />
                                <span>24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="w-5 h-5 text-yellow-300" />
                                <span>Budget Friendly</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="w-5 h-5 text-yellow-300" />
                                <span>Trusted by 500+ Students</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </section>

            {/* CTA Buttons Section */}
            <section className="py-12 sm:py-16 px-4">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            What Do You Need <span className="gradient-text">Help With?</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Choose the service you need, or register for our complete arrival package
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {ctaButtons.map((cta, index) => (
                            <motion.button
                                key={cta.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCTAClick(cta.id)}
                                className={`relative p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all group ${cta.featured ? 'ring-2 ring-orange-500' : ''
                                    }`}
                            >
                                {cta.featured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
                                            RECOMMENDED
                                        </span>
                                    </div>
                                )}

                                <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${cta.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    <cta.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">{cta.title}</h3>
                                <p className="text-sm text-gray-600">{cta.description}</p>

                                <div className="mt-4 flex items-center justify-center text-primary font-semibold group-hover:gap-2 transition-all">
                                    Get Started
                                    <svg className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <HowItWorks />

            {/* What's Included */}
            <WhatsIncluded />

            {/* Registration Form */}
            <section id="registration-form" className="py-16 px-4 bg-white">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Student <span className="gradient-text">Registration Form</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Fill out your details and we'll get in touch within 24 hours
                        </p>
                    </motion.div>

                    <StudentRegistrationForm selectedService={selectedService} />
                </div>
            </section>

            {/* Pricing */}
            <PricingSection />

            {/* FAQ */}
            <FAQSection />

            {/* Testimonials Placeholder */}
            <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            What <span className="gradient-text">Students Say</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join hundreds of satisfied international students
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: 'Priya Sharma',
                                location: 'Mumbai → Sydney',
                                text: 'They picked me up at 2 AM when my flight landed. Found me a great room and helped me sign up for Uber Eats the next day. Couldn\'t have asked for better support!'
                            },
                            {
                                name: 'Rahul Verma',
                                location: 'Delhi → Melbourne',
                                text: 'The temporary accommodation was clean, affordable, and close to my university. They really understand what students need.'
                            },
                            {
                                name: 'Sneha Patel',
                                location: 'Bangalore → Brisbane',
                                text: 'Best decision I made! They helped me with everything - from airport pickup to finding my first job. Highly recommend to all Indian students.'
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Questions? We're Here to Help!
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Chat with us on WhatsApp for instant answers in Hindi or English
                        </p>
                        <a
                            href="https://wa.me/61458717810?text=Hi!%20I'm%20an%20international%20student%20interested%20in%20your%20arrival%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                            <FiPhone className="w-6 h-6" />
                            Chat on WhatsApp
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <WhatsAppButton />
        </div>
    );
};

export default StudentArrivalHub;
