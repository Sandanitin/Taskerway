import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => scrollToSection('home')}
                    >
                        <img
                            src="/taskerway_logo.png"
                            alt="Taskerway"
                            className="h-12 w-auto object-contain"
                        />
                        <span className={`text-2xl font-bold gradient-text ${isScrolled ? '' : 'text-white'}`}>
                            Taskerway
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('home')}
                            className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
                                }`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
                                }`}
                        >
                            Contact
                        </button>

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
                        className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'
                            }`}
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
                    <button
                        onClick={() => scrollToSection('home')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection('services')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Services
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Contact
                    </button>

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
