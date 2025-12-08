import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'How early should I book airport pickup?',
            answer: 'We recommend booking at least 3-5 days before your arrival date. However, we can accommodate last-minute requests (even 24 hours before) depending on availability. The earlier you book, the better we can prepare for your arrival.'
        },
        {
            question: 'What\'s included in the temporary accommodation?',
            answer: 'Our temporary accommodation includes a clean, safe room (shared or private options), WiFi, basic utilities, kitchen facilities, and access to bathroom. All properties are located near public transport and essential services. Bedding and basic amenities are provided.'
        },
        {
            question: 'How long does job sign-up assistance take?',
            answer: 'Typically, we can help you sign up for platforms like Uber Eats and DoorDash within 1-2 days of your arrival. However, approval from these platforms can take 3-7 business days. We\'ll guide you through the entire process and follow up until you\'re approved.'
        },
        {
            question: 'What documents do I need?',
            answer: 'For airport pickup: Just your flight details. For accommodation: Valid passport and student visa. For job platforms: Passport, student visa with work rights, Australian bank account details (we can help you open one), and a smartphone. We\'ll provide a complete checklist after registration.'
        },
        {
            question: 'Is there support after I find permanent accommodation?',
            answer: 'Yes! Even after you move to permanent accommodation, you can still reach us on WhatsApp for guidance. We\'re here to help you throughout your first few months in Australia, whether it\'s job questions, local advice, or just general support.'
        },
        {
            question: 'What if my flight is delayed?',
            answer: 'No worries! We track flight statuses in real-time. If your flight is delayed, we\'ll adjust the pickup time automatically. Just make sure to keep your phone on when you land so we can coordinate. There are no extra charges for flight delays.'
        },
        {
            question: 'Can I extend my temporary accommodation?',
            answer: 'Yes, you can extend your stay week by week based on availability. Just let us know at least 3 days before your current booking ends. We\'ll do our best to keep you in the same room, or find you another suitable option nearby.'
        },
        {
            question: 'Do you help with other things like SIM cards and bank accounts?',
            answer: 'Absolutely! With our Complete Arrival Package, we provide guidance on opening an Australian bank account, getting a local SIM card, understanding public transport, and finding grocery stores. We want to make sure you have everything you need to settle in comfortably.'
        },
        {
            question: 'How do I pay for the services?',
            answer: 'We accept multiple payment methods including bank transfer (both Indian and Australian accounts), PayPal, and credit/debit cards. For airport pickup, we prefer payment in advance. For accommodation, you can pay weekly. We\'ll send you payment details after you register.'
        },
        {
            question: 'Is this service only for Indian students?',
            answer: 'While we specialize in helping Indian students (and can communicate in Hindi!), we welcome international students from all countries. Our team is experienced in helping students from diverse backgrounds settle in Australia.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about our student arrival services
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <FiChevronDown className="w-6 h-6 text-primary" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Still Have Questions?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        We're here to help! Chat with us on WhatsApp and we'll answer all your questions in Hindi or English.
                    </p>
                    <a
                        href="https://wa.me/61458717810?text=Hi!%20I%20have%20some%20questions%20about%20the%20student%20arrival%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
