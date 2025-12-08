import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiTruck,
    FiHome,
    FiScissors,
    FiPackage,
    FiDroplet,
    FiEdit3,
    FiZap,
    FiTool,
    FiMonitor,
} from 'react-icons/fi';
import { MdOutlineAirplanemodeActive } from 'react-icons/md';
import Card from './ui/Card';
import AirportBooking from './AirportBooking';
import ServiceModal from './ServiceModal';

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isAirportModalOpen, setIsAirportModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    const services = [
        {
            id: 'student-arrival',
            title: 'Student Arrival Hub',
            description: 'Complete support for international students arriving in Australia',
            icon: () => (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            gradient: 'from-orange-500 to-red-600',
            special: true,
            badge: 'FOR STUDENTS',
            linkTo: '/student-arrival',
            image: '/images/services/student_arrival.jpg'
        },
        {
            id: 'airport',
            title: 'Airport Pick/Drop',
            description: 'Reliable airport transfers with professional drivers',
            icon: MdOutlineAirplanemodeActive,
            gradient: 'from-purple-500 to-indigo-600',
            special: true,
            image: '/images/services/airport_drop.jpg'
        },
        {
            id: 'transport',
            title: 'Transport & Logistics',
            description: 'Moving goods and freight with care',
            icon: FiTruck,
            gradient: 'from-blue-500 to-cyan-600',
            image: '/images/services/Transport & Logistics.jpg'
        },
        {
            id: 'cleaning',
            title: 'Home Cleaning',
            description: 'Professional cleaning for your home',
            icon: FiHome,
            gradient: 'from-green-500 to-teal-600',
            image: '/images/services/home_cleaning.jpg'
        },
        {
            id: 'gardening',
            title: 'Gardening & Lawn Mowing',
            description: 'Keep your garden looking beautiful',
            icon: FiScissors,
            gradient: 'from-lime-500 to-green-600',
            image: '/images/services/gardening.jpg'
        },
        {
            id: 'pickup',
            title: 'Pick-up & Delivery',
            description: 'Quick and efficient delivery services',
            icon: FiPackage,
            gradient: 'from-orange-500 to-red-600',
            image: '/images/services/pickup_delivery.jpg'
        },
        {
            id: 'plumbing',
            title: 'Plumbing',
            description: 'Expert plumbing repairs and installations',
            icon: FiDroplet,
            gradient: 'from-blue-600 to-indigo-700',
            image: '/images/services/Plumbing.jpg'
        },
        {
            id: 'painting',
            title: 'Painting',
            description: 'Professional interior and exterior painting',
            icon: FiEdit3,
            gradient: 'from-pink-500 to-rose-600',
            image: '/images/services/Painting.jpg'
        },
        {
            id: 'electrical',
            title: 'Electrical Services',
            description: 'Licensed electrical work and repairs',
            icon: FiZap,
            gradient: 'from-yellow-500 to-orange-600',
            image: '/images/services/electrical.jpg'
        },
        {
            id: 'carpentry',
            title: 'Carpentry',
            description: 'Custom woodwork and furniture repairs',
            icon: FiTool,
            gradient: 'from-amber-600 to-brown-700',
            image: '/images/services/carpentry.jpg'
        },
        {
            id: 'it',
            title: 'IT Solutions',
            description: 'Computer repairs and tech support',
            icon: FiMonitor,
            gradient: 'from-indigo-500 to-purple-600',
            image: '/images/services/it_solutions.jpg'
        },
    ];

    const handleServiceClick = (service) => {
        // If service has a linkTo, we'll handle it differently (via Link component)
        if (service.linkTo) {
            return; // Handled by Link wrapper in the render
        } else if (service.special && service.id === 'airport') {
            setIsAirportModalOpen(true);
        } else {
            setSelectedService(service);
            setIsServiceModalOpen(true);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section id="services" className="section bg-gray-50 px-4">
            <div className="container-custom">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Our <span className="gradient-text">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2"
                    >
                        Whatever you need, we've got you covered. Professional services at your fingertips.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {services.map((service) => {
                        const cardContent = (
                            <Card
                                onClick={() => handleServiceClick(service)}
                                className="relative overflow-hidden group cursor-pointer h-full"
                            >
                                {/* Service Image */}
                                <div className="relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient}`} />

                                    {service.special && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                                                {service.badge || 'FEATURED'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Icon */}
                                    <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                                        <service.icon className="w-8 h-8" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                        {service.linkTo ? 'Learn More' : 'Book Now'}
                                        <svg
                                            className="w-5 h-5 ml-1 group-hover:ml-2 transition-all"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Card>
                        );

                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {service.linkTo ? (
                                    <Link to={service.linkTo}>
                                        {cardContent}
                                    </Link>
                                ) : (
                                    cardContent
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Airport Booking Modal */}
            <AirportBooking
                isOpen={isAirportModalOpen}
                onClose={() => setIsAirportModalOpen(false)}
            />

            {/* Service Modal for other services */}
            <ServiceModal
                isOpen={isServiceModalOpen}
                onClose={() => {
                    setIsServiceModalOpen(false);
                    setSelectedService(null);
                }}
                service={selectedService}
            />
        </section>
    );
};

export default Services;