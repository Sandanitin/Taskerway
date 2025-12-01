import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiClock, FiAlignLeft, FiDollarSign } from 'react-icons/fi';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { sendServiceBookingEmail } from '../utils/emailService';

const ServiceModal = ({ isOpen, onClose, service }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        description: '',
        budget: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

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
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Please describe what you need';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await sendServiceBookingEmail({
                ...formData,
                serviceType: service?.title || 'Service',
            });

            navigate('/confirmation', {
                state: {
                    bookingData: {
                        ...formData,
                        serviceType: service?.title,
                    },
                },
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                date: '',
                time: '',
                description: '',
                budget: '',
            });
            onClose();
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error submitting your booking. Please try again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            date: '',
            time: '',
            description: '',
            budget: '',
        });
        setErrors({});
        onClose();
    };

    if (!service) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleModalClose}
            title={`Book ${service.title}`}
            size="md"
        >
            <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg mb-4`}>
                    <service.icon className="w-8 h-8" />
                </div>
                <p className="text-gray-600">{service.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

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
                    label="Service Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, Sydney NSW 2000"
                    required
                    error={errors.address}
                    icon={FiMapPin}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Preferred Date"
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
                        label="Preferred Time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        icon={FiClock}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Please describe what you need help with..."
                            rows={4}
                            required
                            className={`input ${errors.description ? 'input-error' : ''}`}
                        />
                    </div>
                    {errors.description && (
                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>

                <Input
                    label="Budget (Optional)"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., $100-$200"
                    icon={FiDollarSign}
                />

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleModalClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ServiceModal;
