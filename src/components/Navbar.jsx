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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${isScrolled ? 'shadow-lg' : 'shadow-md'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3 cursor-pointer"
                    >
                        <Link to="/" className="flex items-center space-x-3">
                            <img
                                src="/taskerway_logo.png"
                                alt="Taskerway"
                                className="h-12 w-auto object-contain"
                            />
                            <span className="text-2xl font-bold text-black">
                                Taskerway
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="font-medium transition-colors text-gray-700 hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="font-medium transition-colors text-gray-700 hover:text-primary"
                        >
                            About
                        </Link>
                        <Link
                            to="/services"
                            className="font-medium transition-colors text-gray-700 hover:text-primary"
                        >
                            Services
                        </Link>
                        {isHomePage ? (
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="font-medium transition-colors text-gray-700 hover:text-primary"
                            >
                                Contact
                            </button>
                        ) : (
                            <Link
                                to="/contact"
                                className="font-medium transition-colors text-gray-700 hover:text-primary"
                            >
                                Contact
                            </Link>
                        )}

                        <a
                            href="tel:0458717810"
                            className="btn btn-primary btn-sm"
                        >
                            <FiPhone className="w-4 h-4" />
                            0458 717 810
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700"
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
                className="md:hidden overflow-hidden bg-white border-t border-gray-200"
            >
                <div className="container-custom py-4 space-y-4">
                    <Link
                        to="/"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Services
                    </Link>
                    {isHomePage ? (
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Contact
                        </button>
                    ) : (
                        <Link
                            to="/contact"
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    )}

                    <a
                        href="tel:0458717810"
                        className="btn btn-primary w-full"
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
