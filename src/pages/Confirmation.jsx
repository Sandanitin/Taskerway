import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMail, FiPhone, FiHome } from 'react-icons/fi';
import Button from '../components/ui/Button';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;

    useEffect(() => {
        if (!bookingData) {
            navigate('/');
        }
    }, [bookingData, navigate]);

    if (!bookingData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        We Got Your Request!
                    </h1>
                    <p className="text-lg text-gray-600">
                        Thank you for choosing Taskerway. We've received your booking request and will get back to you shortly.
                    </p>
                </motion.div>

                {/* Response Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-primary p-6 rounded-xl text-white text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-bold">Response Time</h3>
                    </div>
                    <p className="text-lg">We will respond and confirm within 24 hours</p>
                </motion.div>

                {/* Booking Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-50 rounded-xl p-6 mb-8"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Details</h3>
                    <div className="space-y-3">
                        {bookingData.serviceType && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Service:</span>
                                <span className="font-semibold text-gray-900">
                                    {typeof bookingData.serviceType === 'string' && bookingData.serviceType.includes('pick')
                                        ? 'Airport Pickup'
                                        : typeof bookingData.serviceType === 'string' && bookingData.serviceType.includes('drop')
                                            ? 'Airport Drop-off'
                                            : bookingData.serviceType}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-semibold text-gray-900">{bookingData.name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold text-gray-900">{bookingData.email}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-semibold text-gray-900">{bookingData.phone}</span>
                        </div>

                        {bookingData.date && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-semibold text-gray-900">
                                    {new Date(bookingData.date).toLocaleDateString()}
                                </span>
                            </div>
                        )}

                        {bookingData.time && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-semibold text-gray-900">{bookingData.time}</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Email Confirmation Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8"
                >
                    <FiMail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-blue-900">
                            A confirmation email has been sent to <strong>{bookingData.email}</strong>.
                            Please check your inbox for further details.
                        </p>
                        <p className="text-xs text-blue-700 mt-2">
                            Note: If you don't receive an email within a few minutes, please contact us directly.
                            Our system may be in test mode.
                        </p>
                    </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mb-8"
                >
                    <p className="text-gray-600 mb-4">Need immediate assistance?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:0458717810" className="flex items-center justify-center gap-2 text-primary font-semibold hover:text-primary-dark">
                            <FiPhone className="w-5 h-5" />
                            0458 717 810
                        </a>
                        <a href="mailto:support@taskerway.com.au" className="flex items-center justify-center gap-2 text-primary font-semibold hover:text-primary-dark">
                            <FiMail className="w-5 h-5" />
                            support@taskerway.com.au
                        </a>
                    </div>
                </motion.div>

                {/* Return Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <Button
                        onClick={() => navigate('/')}
                        icon={FiHome}
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Return to Home
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Confirmation;
