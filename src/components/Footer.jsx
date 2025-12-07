import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const quickLinks = [
        { label: 'Home', action: () => scrollToSection('home') },
        { label: 'Services', action: () => scrollToSection('services') },
        { label: 'About Us', to: '/about' },
        { label: 'Contact', action: () => scrollToSection('contact') },
    ];

    const services = [
        'Airport Transfers',
        'Home Cleaning',
        'Plumbing',
        'Electrical',
        'IT Solutions',
        'Gardening',
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <img
                                src="/taskerway_logo.png"
                                alt="Taskerway"
                                className="h-12 w-auto object-contain"
                            />
                            <div>
                                <span className="text-2xl font-bold text-white">Taskerway</span>
                                <p className="text-xs text-gray-400">Get Things Done</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Professional services for every need. Available 24/7 across Australia. Quality, reliability, and satisfaction guaranteed.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: FiFacebook, href: '#', label: 'Facebook' },
                                { icon: FiInstagram, href: '#', label: 'Instagram' },
                                { icon: FiTwitter, href: '#', label: 'Twitter' },
                                { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    {link.to ? (
                                        <Link
                                            to={link.to}
                                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <FiArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={link.action}
                                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <FiArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to="/services"
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <FiArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:0458717810"
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                                        <FiPhone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call us</p>
                                        <p className="font-medium text-white">0458 717 810</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@taskerway.com.au"
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                                        <FiMail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email us</p>
                                        <p className="font-medium text-white text-sm">support@taskerway.com.au</p>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium text-white">Australia Wide</p>
                                </div>
                            </li>
                        </ul>

                        {/* 24/7 Badge */}
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-blue-400">Available 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © {currentYear} Taskerway. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
