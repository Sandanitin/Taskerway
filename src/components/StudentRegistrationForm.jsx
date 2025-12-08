import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiBriefcase } from 'react-icons/fi';

const StudentRegistrationForm = ({ selectedService = 'complete' }) => {
    const [formData, setFormData] = useState({
        // Personal Details
        fullName: '',
        email: '',
        phoneIndia: '',
        phoneAustralia: '',
        age: '',
        gender: '',

        // Arrival Details
        country: 'Australia',
        city: '',
        arrivalDate: '',
        arrivalAirport: '',
        flightNumber: '',
        numberOfBags: '1',
        needPickup: 'yes',

        // Accommodation Needs
        needAccommodation: 'yes',
        budgetPerWeek: '',
        daysNeeded: '',

        // Job Assistance
        wantUberEats: true,
        wantDoorDash: true,
        previousExperience: '',

        // Location Preference
        preferredLocation: '',

        // Additional Notes
        additionalNotes: '',

        // Service Type
        serviceType: selectedService
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Australian cities and their airports
    const cityAirports = {
        Sydney: ['Sydney Kingsford Smith Airport (SYD)'],
        Melbourne: ['Melbourne Airport (MEL)', 'Avalon Airport (AVV)'],
        Brisbane: ['Brisbane Airport (BNE)'],
        Perth: ['Perth Airport (PER)'],
        Adelaide: ['Adelaide Airport (ADL)'],
        'Gold Coast': ['Gold Coast Airport (OOL)'],
        Canberra: ['Canberra Airport (CBR)'],
        Hobart: ['Hobart Airport (HBA)'],
        Darwin: ['Darwin Airport (DRW)'],
        Cairns: ['Cairns Airport (CNS)']
    };

    const cities = Object.keys(cityAirports);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Details
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phoneIndia.trim()) newErrors.phoneIndia = 'Indian phone number is required';
        if (!formData.age || formData.age < 18) newErrors.age = 'Must be 18 or older';

        // Arrival Details
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
        if (formData.needPickup === 'yes' && !formData.arrivalAirport) {
            newErrors.arrivalAirport = 'Airport is required for pickup';
        }

        // Accommodation
        if (formData.needAccommodation === 'yes') {
            if (!formData.budgetPerWeek) newErrors.budgetPerWeek = 'Budget is required';
            if (!formData.daysNeeded) newErrors.daysNeeded = 'Number of days is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Format all form data into a WhatsApp message
            let message = `🎓 *STUDENT REGISTRATION*\n\n`;

            message += `*PERSONAL DETAILS*\n`;
            message += `Name: ${formData.fullName}\n`;
            message += `Email: ${formData.email}\n`;
            message += `Phone (India): ${formData.phoneIndia}\n`;
            if (formData.phoneAustralia) message += `Phone (Australia): ${formData.phoneAustralia}\n`;
            message += `Age: ${formData.age}\n`;
            if (formData.gender) message += `Gender: ${formData.gender}\n`;
            message += `\n`;

            message += `*ARRIVAL DETAILS*\n`;
            message += `City: ${formData.city}\n`;
            message += `Arrival Date: ${formData.arrivalDate}\n`;
            message += `Need Pickup: ${formData.needPickup === 'yes' ? 'Yes ✅' : 'No'}\n`;
            if (formData.needPickup === 'yes') {
                message += `Airport: ${formData.arrivalAirport}\n`;
                if (formData.flightNumber) message += `Flight: ${formData.flightNumber}\n`;
                message += `Bags: ${formData.numberOfBags}\n`;
            }
            message += `\n`;

            message += `*ACCOMMODATION*\n`;
            message += `Need Accommodation: ${formData.needAccommodation === 'yes' ? 'Yes ✅' : 'No'}\n`;
            if (formData.needAccommodation === 'yes') {
                message += `Budget/Week: $${formData.budgetPerWeek} AUD\n`;
                message += `Days Needed: ${formData.daysNeeded}\n`;
            }
            if (formData.preferredLocation) message += `Preferred Location: ${formData.preferredLocation}\n`;
            message += `\n`;

            message += `*JOB ASSISTANCE*\n`;
            message += `Uber Eats: ${formData.wantUberEats ? 'Yes ✅' : 'No'}\n`;
            message += `DoorDash: ${formData.wantDoorDash ? 'Yes ✅' : 'No'}\n`;
            if (formData.previousExperience) {
                message += `Experience: ${formData.previousExperience}\n`;
            }
            message += `\n`;

            if (formData.additionalNotes) {
                message += `*ADDITIONAL NOTES*\n${formData.additionalNotes}\n\n`;
            }

            message += `*Service Package:* ${formData.serviceType === 'complete' ? 'Complete Arrival Package' : formData.serviceType}`;

            // WhatsApp number
            const whatsappNumber = '61458717810';

            // Create WhatsApp URL with pre-filled message
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            setSubmitStatus({
                type: 'success',
                message: 'Opening WhatsApp... Please send the message to complete your registration!'
            });

            // Reset form after short delay
            setTimeout(() => {
                setFormData({
                    fullName: '',
                    email: '',
                    phoneIndia: '',
                    phoneAustralia: '',
                    age: '',
                    gender: '',
                    country: 'Australia',
                    city: '',
                    arrivalDate: '',
                    arrivalAirport: '',
                    flightNumber: '',
                    numberOfBags: '1',
                    needPickup: 'yes',
                    needAccommodation: 'yes',
                    budgetPerWeek: '',
                    daysNeeded: '',
                    wantUberEats: true,
                    wantDoorDash: true,
                    previousExperience: '',
                    preferredLocation: '',
                    additionalNotes: '',
                    serviceType: selectedService
                });
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100"
        >
            {/* Personal Details */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                    <FiUser className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-gray-900">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`input ${errors.fullName ? 'input-error' : ''}`}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input ${errors.email ? 'input-error' : ''}`}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number (India) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phoneIndia"
                            value={formData.phoneIndia}
                            onChange={handleChange}
                            className={`input ${errors.phoneIndia ? 'input-error' : ''}`}
                            placeholder="+91 98765 43210"
                        />
                        {errors.phoneIndia && <p className="text-red-500 text-sm mt-1">{errors.phoneIndia}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number (Australia)
                        </label>
                        <input
                            type="tel"
                            name="phoneAustralia"
                            value={formData.phoneAustralia}
                            onChange={handleChange}
                            className="input"
                            placeholder="+61 (optional)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`input ${errors.age ? 'input-error' : ''}`}
                            placeholder="18"
                            min="18"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender (Optional)
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Arrival Details */}
            <div className="mb-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <FiCalendar className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-gray-900">Arrival Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`input ${errors.city ? 'input-error' : ''}`}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Arrival Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="arrivalDate"
                            value={formData.arrivalDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={`input ${errors.arrivalDate ? 'input-error' : ''}`}
                        />
                        {errors.arrivalDate && <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Need Airport Pickup? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="needPickup"
                                    value="yes"
                                    checked={formData.needPickup === 'yes'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="needPickup"
                                    value="no"
                                    checked={formData.needPickup === 'no'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary"
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>

                    {formData.needPickup === 'yes' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Arrival Airport <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="arrivalAirport"
                                    value={formData.arrivalAirport}
                                    onChange={handleChange}
                                    className={`input ${errors.arrivalAirport ? 'input-error' : ''}`}
                                    disabled={!formData.city}
                                >
                                    <option value="">
                                        {formData.city ? 'Select Airport' : 'Select city first'}
                                    </option>
                                    {formData.city && cityAirports[formData.city]?.map(airport => (
                                        <option key={airport} value={airport}>{airport}</option>
                                    ))}
                                </select>
                                {errors.arrivalAirport && <p className="text-red-500 text-sm mt-1">{errors.arrivalAirport}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Flight Number (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="flightNumber"
                                    value={formData.flightNumber}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., AI301"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Bags
                                </label>
                                <input
                                    type="number"
                                    name="numberOfBags"
                                    value={formData.numberOfBags}
                                    onChange={handleChange}
                                    className="input"
                                    min="1"
                                    max="10"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Accommodation Needs */}
            <div className="mb-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <FiMapPin className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-gray-900">Accommodation Needs</h3>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Require Temporary Accommodation? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="needAccommodation"
                                value="yes"
                                checked={formData.needAccommodation === 'yes'}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary"
                            />
                            <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="needAccommodation"
                                value="no"
                                checked={formData.needAccommodation === 'no'}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                {formData.needAccommodation === 'yes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Budget per Week (AUD) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="budgetPerWeek"
                                    value={formData.budgetPerWeek}
                                    onChange={handleChange}
                                    className={`input pl-8 ${errors.budgetPerWeek ? 'input-error' : ''}`}
                                    placeholder="150"
                                    min="50"
                                />
                            </div>
                            {errors.budgetPerWeek && <p className="text-red-500 text-sm mt-1">{errors.budgetPerWeek}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Number of Days Needed <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="daysNeeded"
                                value={formData.daysNeeded}
                                onChange={handleChange}
                                className={`input ${errors.daysNeeded ? 'input-error' : ''}`}
                                placeholder="7"
                                min="1"
                            />
                            {errors.daysNeeded && <p className="text-red-500 text-sm mt-1">{errors.daysNeeded}</p>}
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred City/Suburb
                    </label>
                    <input
                        type="text"
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        className="input"
                        placeholder="e.g., Parramatta, CBD, etc."
                    />
                </div>
            </div>

            {/* Job Assistance */}
            <div className="mb-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <FiBriefcase className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-gray-900">Job Assistance</h3>
                </div>

                <div className="space-y-4 mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="wantUberEats"
                            checked={formData.wantUberEats}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary rounded"
                        />
                        <span className="text-gray-700">Want help signing up for Uber Eats?</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="wantDoorDash"
                            checked={formData.wantDoorDash}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary rounded"
                        />
                        <span className="text-gray-700">Want help signing up for DoorDash?</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Any Previous Experience? (Optional)
                    </label>
                    <textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        className="input min-h-[100px]"
                        placeholder="Tell us about any delivery or gig work experience..."
                    />
                </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8 pt-8 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                </label>
                <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="input min-h-[120px]"
                    placeholder="Any special requirements or questions? Let us know..."
                />
            </div>

            {/* Submit Status */}
            {submitStatus && (
                <motion.div
                    id="submit-status"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        {submitStatus.type === 'success' ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        )}
                        <p className="font-semibold">{submitStatus.message}</p>
                    </div>
                </motion.div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                    }`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                    </span>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Submit via WhatsApp
                    </>
                )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
                Your registration will be sent via WhatsApp. We'll respond within 24 hours!
            </p>
        </motion.form>
    );
};

export default StudentRegistrationForm;
