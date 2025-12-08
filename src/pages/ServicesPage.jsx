import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import AirportBooking from '../components/AirportBooking';
import ServiceModal from '../components/ServiceModal';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isAirportModalOpen, setIsAirportModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Services');

    const services = [
        {
            id: 'airport',
            title: 'Airport Pick/Drop',
            description: 'Reliable airport transfers with professional drivers. We ensure you arrive on time and in comfort with our experienced chauffeurs and premium vehicles.',
            icon: MdOutlineAirplanemodeActive,
            gradient: 'from-purple-500 to-indigo-600',
            special: true,
            category: 'Transport',
            image: '/images/services/airport_drop.jpg'
        },
        {
            id: 'transport',
            title: 'Transport & Logistics',
            description: 'Moving goods and freight with care. Our transport services cover everything from small packages to large freight with secure handling and timely delivery.',
            icon: FiTruck,
            gradient: 'from-blue-500 to-cyan-600',
            category: 'Transport',
            image: '/images/services/Transport & Logistics.jpg'
        },
        {
            id: 'cleaning',
            title: 'Home Cleaning',
            description: 'Professional cleaning for your home. Our trained cleaners use eco-friendly products to leave your space spotless and refreshed, tailored to your specific needs.',
            icon: FiHome,
            gradient: 'from-green-500 to-teal-600',
            category: 'Home Services',
            image: '/images/services/home_cleaning.jpg'
        },
        {
            id: 'gardening',
            title: 'Gardening & Lawn Mowing',
            description: 'Keep your garden looking beautiful. Our gardening experts provide lawn mowing, pruning, planting, and seasonal maintenance to enhance your outdoor space.',
            icon: FiScissors,
            gradient: 'from-lime-500 to-green-600',
            category: 'Home Services',
            image: '/images/services/gardening.jpg'
        },
        {
            id: 'pickup',
            title: 'Pick-up & Delivery',
            description: 'Quick and efficient delivery services. Whether it\'s documents, parcels, or larger items, we offer reliable same-day and scheduled delivery options.',
            icon: FiPackage,
            gradient: 'from-orange-500 to-red-600',
            category: 'Transport',
            image: '/images/services/pickup_delivery.jpg'
        },
        {
            id: 'plumbing',
            title: 'Plumbing',
            description: 'Expert plumbing repairs and installations. From leaky taps to major pipe work, our licensed plumbers provide fast, reliable solutions for all your plumbing needs.',
            icon: FiDroplet,
            gradient: 'from-blue-600 to-indigo-700',
            category: 'Maintenance',
            image: '/images/services/Plumbing.jpg'
        },
        {
            id: 'painting',
            title: 'Painting',
            description: 'Professional interior and exterior painting. Transform your space with our expert painters who deliver flawless finishes with quality paints and meticulous attention to detail.',
            icon: FiEdit3,
            gradient: 'from-pink-500 to-rose-600',
            category: 'Maintenance',
            image: '/images/services/Painting.jpg'
        },
        {
            id: 'electrical',
            title: 'Electrical Services',
            description: 'Licensed electrical work and repairs. Our certified electricians handle installations, repairs, safety inspections, and upgrades to keep your property safe and functional.',
            icon: FiZap,
            gradient: 'from-yellow-500 to-orange-600',
            category: 'Maintenance',
            image: '/images/services/electrical.jpg'
        },
        {
            id: 'carpentry',
            title: 'Carpentry',
            description: 'Custom woodwork and furniture repairs. From furniture restoration to custom installations, our skilled carpenters bring craftsmanship and precision to every project.',
            icon: FiTool,
            gradient: 'from-amber-600 to-brown-700',
            category: 'Maintenance',
            image: '/images/services/carpentry.jpg'
        },
        {
            id: 'it',
            title: 'IT Solutions',
            description: 'Computer repairs and tech support. Get help with hardware issues, software problems, network setup, and tech support from our qualified IT professionals.',
            icon: FiMonitor,
            gradient: 'from-indigo-500 to-purple-600',
            category: 'Tech Support',
            image: '/images/services/it_solutions.jpg'
        },
    ];

    // Filter services based on selected category
    const filteredServices = selectedCategory === 'All Services'
        ? services
        : services.filter(service => service.category === selectedCategory);

    const handleServiceClick = (service) => {
        if (service.special) {
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
        <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="container-custom px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Our <span className="gradient-text">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2"
                    >
                        Whatever you need, we've got you covered. Professional services at your fingertips.
                    </motion.p>
                </div>

                {/* Service Categories */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                    {[
                        'All Services',
                        'Transport',
                        'Home Services',
                        'Maintenance',
                        'Tech Support'
                    ].map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`py-2 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base whitespace-nowrap transition-all ${selectedCategory === category
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {filteredServices.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                            onClick={() => handleServiceClick(service)}
                        >
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
                                            FEATURED
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} text-white shadow-md mr-4`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                </div>

                                <p className="text-gray-600 mb-4">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                    Book Now
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
                        </motion.div>
                    ))}
                </motion.div>

                {/* Service Guarantee */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Guarantee</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We stand behind the quality of our work. If you're not satisfied, we'll make it right.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Satisfaction Guaranteed',
                                description: 'We\'ll re-do the job until you\'re completely satisfied, no extra charge.'
                            },
                            {
                                title: 'Professional Quality',
                                description: 'All our service providers are vetted, trained, and experienced professionals.'
                            },
                            {
                                title: 'On-Time Arrival',
                                description: 'We guarantee punctual arrival or you don\'t pay waiting fees.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
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

export default ServicesPage;