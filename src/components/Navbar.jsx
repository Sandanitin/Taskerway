import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const isHomePage = location.pathname === '/';

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/services', label: 'Services' },
        { to: '/student-arrival', label: 'Student Hub' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white shadow-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                                <img
                                    src="/taskerway_logo.png"
                                    alt="Taskerway"
                                    className="h-10 sm:h-12 w-auto object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                    Taskerway
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                                    Get Things Done
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={link.to}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${location.pathname === link.to
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Contact Button */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {isHomePage ? (
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="px-4 py-2 rounded-full font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                                >
                                    Contact
                                </button>
                            ) : (
                                <Link
                                    to="/contact"
                                    className="px-4 py-2 rounded-full font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                                >
                                    Contact
                                </Link>
                            )}
                        </motion.div>

                        {/* Phone CTA */}
                        <motion.a
                            href="tel:0458717810"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <FiPhone className="w-4 h-4" />
                            <span className="hidden lg:inline">0458 717 810</span>
                            <span className="lg:hidden">Call</span>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{
                    height: isMobileMenuOpen ? 'auto' : 0,
                    opacity: isMobileMenuOpen ? 1 : 0,
                }}
                className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
                <div className="px-4 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === link.to
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {isHomePage ? (
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
                        >
                            Contact
                        </button>
                    ) : (
                        <Link
                            to="/contact"
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    )}

                    <a
                        href="tel:0458717810"
                        className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                        <FiPhone className="w-4 h-4" />
                        0458 717 810
                    </a>
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;
