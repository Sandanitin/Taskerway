import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar } from 'react-icons/fi';

const PricingSection = () => {
    const pricingPlans = [
        {
            name: 'Airport Pickup Only',
            price: '75',
            period: 'one-time',
            description: 'Just need a ride from the airport',
            features: [
                'Airport pickup service',
                'Comfortable air-conditioned vehicle',
                'Help with luggage (up to 3 bags)',
                'Drop-off to your accommodation',
                'Basic local orientation'
            ],
            color: 'from-blue-500 to-cyan-600',
            popular: false
        },
        {
            name: 'Temporary Stay Package',
            price: '150-250',
            period: 'per week',
            description: 'Budget-friendly accommodation',
            features: [
                'Clean, safe accommodation',
                'Shared or private room options',
                'WiFi and utilities included',
                'Near public transport',
                'Kitchen facilities',
                'Flexible duration (minimum 1 week)'
            ],
            color: 'from-green-500 to-teal-600',
            popular: false
        },
        {
            name: 'Complete Arrival Package',
            price: '299',
            period: 'one-time + accommodation',
            description: 'Everything you need for a smooth start',
            features: [
                'Airport pickup included',
                '1 week temporary accommodation',
                'Job platform sign-up assistance',
                'Bank account setup guidance',
                'SIM card assistance',
                'Local area orientation',
                'Ongoing WhatsApp support',
                '24/7 emergency contact'
            ],
            color: 'from-orange-500 to-red-600',
            popular: true,
            savings: 'Save $50+'
        },
        {
            name: 'Job Setup Assistance',
            price: 'Free',
            period: 'with package',
            description: 'Get started earning right away',
            features: [
                'Uber Eats sign-up help',
                'DoorDash registration',
                'Menulog account setup',
                'Document verification support',
                'Tips for getting started',
                'Equipment recommendations'
            ],
            color: 'from-purple-500 to-indigo-600',
            popular: false,
            note: 'Free when you book the Complete Package'
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
                        Transparent <span className="gradient-text">Pricing</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose the services you need. No hidden fees, no surprises.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 ${plan.popular ? 'border-orange-500 lg:scale-105' : 'border-gray-100'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="flex items-center gap-1 px-4 py-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
                                        <FiStar className="w-3 h-3" />
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            {/* Savings Badge */}
                            {plan.savings && (
                                <div className="absolute -top-4 right-4">
                                    <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full border border-green-300">
                                        {plan.savings}
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    {plan.price !== 'Free' && <span className="text-2xl font-bold text-gray-900">$</span>}
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                </div>
                                <p className="text-sm text-gray-600">{plan.period}</p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                                        <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Note */}
                            {plan.note && (
                                <p className="text-xs text-gray-500 italic mb-4 p-2 bg-gray-50 rounded">
                                    {plan.note}
                                </p>
                            )}

                            {/* CTA Button */}
                            <button
                                onClick={() => {
                                    document.getElementById('registration-form')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${plan.popular
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:scale-105'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-6 p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-blue-900 font-semibold">All prices in AUD</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-blue-900 font-semibold">Multiple payment options</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-blue-900 font-semibold">No hidden charges</span>
                        </div>
                    </div>
                </motion.div>

                {/* Custom Pricing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        Need a custom package? We're flexible!
                    </p>
                    <a
                        href="https://wa.me/61458717810?text=Hi!%20I'd%20like%20to%20discuss%20custom%20pricing%20for%20student%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                        Contact us on WhatsApp
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
