import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiClock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { MdOutlineAirplanemodeActive, MdOutlineFlightLand, MdOutlineFlightTakeoff } from 'react-icons/md';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { sendAirportBookingEmail } from '../utils/emailService';

const AirportBooking = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        passengerCount: 1,
        name: '',
        email: '',
        phone: '',
        pickupAddress: '',
        dropoffAddress: '',
        date: '',
        time: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.serviceType) {
                newErrors.serviceType = 'Please select pickup or drop-off';
            }
        }

        if (currentStep === 2) {
            if (!formData.name.trim()) {
                newErrors.name = 'Name is required';
            }
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone is required';
            }
        }

        if (currentStep === 3) {
            if (formData.serviceType === 'drop' && !formData.pickupAddress.trim()) {
                newErrors.pickupAddress = 'Pickup address is required';
            }
            if (formData.serviceType === 'pick' && !formData.dropoffAddress.trim()) {
                newErrors.dropoffAddress = 'Drop-off address is required';
            }
            if (!formData.date) {
                newErrors.date = 'Date is required';
            }
            if (!formData.time) {
                newErrors.time = 'Time is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Send email using EmailJS
            console.log('Attempting to send airport booking email with data:', formData);
            const result = await sendAirportBookingEmail(formData);
            console.log('Email sending result:', result);
            
            // Check if this was a mock response
            if (result && result.mock) {
                console.warn('Email was sent via mock service, not real EmailJS. Check console for EmailJS errors.');
                alert('Booking submitted successfully! (Note: Email service is in test mode. For real emails, please contact support to configure EmailJS properly.)');
            } else {
                alert('Booking submitted successfully! A confirmation email will be sent to ' + formData.email);
            }

            // Navigate to confirmation page
            navigate('/confirmation', { state: { bookingData: formData } });

            // Reset form
            setFormData({
                serviceType: '',
                passengerCount: 1,
                name: '',
                email: '',
                phone: '',
                pickupAddress: '',
                dropoffAddress: '',
                date: '',
                time: '',
            });
            setStep(1);
            onClose();
        } catch (error) {
            console.error('Error submitting booking:', error);
            // Show more specific error message to user
            if (error.message) {
                alert(error.message);
            } else {
                alert('There was an error submitting your booking. Please try again or call us directly.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setStep(1);
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Airport Pick/Drop Booking"
            size="md"
        >
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= s ? 'bg-gradient-primary text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-gradient-primary' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>Service Type</span>
                    <span>Your Details</span>
                    <span>Journey Info</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {/* Step 1: Service Type */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Select Service Type
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    onClick={() => handleInputChange({ target: { name: 'serviceType', value: 'pick' } })}
                                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.serviceType === 'pick'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${formData.serviceType === 'pick' ? 'bg-gradient-primary' : 'bg-gray-100'
                                            }`}>
                                            <MdOutlineFlightLand className={`w-8 h-8 ${formData.serviceType === 'pick' ? 'text-white' : 'text-gray-600'
                                                }`} />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Airport Pickup</h4>
                                        <p className="text-sm text-gray-600">We'll pick you up from the airport</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleInputChange({ target: { name: 'serviceType', value: 'drop' } })}
                                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.serviceType === 'drop'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${formData.serviceType === 'drop' ? 'bg-gradient-primary' : 'bg-gray-100'
                                            }`}>
                                            <MdOutlineFlightTakeoff className={`w-8 h-8 ${formData.serviceType === 'drop' ? 'text-white' : 'text-gray-600'
                                                }`} />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Airport Drop-off</h4>
                                        <p className="text-sm text-gray-600">We'll drop you off at the airport</p>
                                    </div>
                                </div>
                            </div>

                            {errors.serviceType && (
                                <p className="text-sm text-red-600">{errors.serviceType}</p>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Passengers (Max 4)
                                </label>
                                <select
                                    name="passengerCount"
                                    value={formData.passengerCount}
                                    onChange={handleInputChange}
                                    className="input"
                                >
                                    <option value={1}>1 Passenger</option>
                                    <option value={2}>2 Passengers</option>
                                    <option value={3}>3 Passengers</option>
                                    <option value={4}>4 Passengers</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Passenger Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Your Details
                            </h3>

                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                required
                                error={errors.name}
                                icon={FiUser}
                            />

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                required
                                error={errors.email}
                                icon={FiMail}
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="0412 345 678"
                                required
                                error={errors.phone}
                                icon={FiPhone}
                            />
                        </motion.div>
                    )}

                    {/* Step 3: Journey Details */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Journey Details
                            </h3>

                            {formData.serviceType === 'drop' && (
                                <Input
                                    label="Pickup Address"
                                    name="pickupAddress"
                                    value={formData.pickupAddress}
                                    onChange={handleInputChange}
                                    placeholder="123 Main St, Sydney NSW 2000"
                                    required
                                    error={errors.pickupAddress}
                                    icon={FiMapPin}
                                />
                            )}

                            {formData.serviceType === 'pick' && (
                                <Input
                                    label="Drop-off Address"
                                    name="dropoffAddress"
                                    value={formData.dropoffAddress}
                                    onChange={handleInputChange}
                                    placeholder="123 Main St, Sydney NSW 2000"
                                    required
                                    error={errors.dropoffAddress}
                                    icon={FiMapPin}
                                />
                            )}

                            <Input
                                label="Date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                error={errors.date}
                                icon={FiCalendar}
                                min={new Date().toISOString().split('T')[0]}
                            />

                            <Input
                                label="Time"
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                error={errors.time}
                                icon={FiClock}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    {step > 1 ? (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleBack}
                            icon={FiArrowLeft}
                        >
                            Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <Button
                            type="button"
                            onClick={handleNext}
                        >
                            Next
                            <FiArrowRight className="w-5 h-5" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default AirportBooking;
