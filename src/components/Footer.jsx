import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiHeart } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/taskerway_logo.png"
                                alt="Taskerway"
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                            <span className="text-2xl font-bold">Taskerway</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Professional services for every need. Available 24/7.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:0458717810"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiPhone className="w-4 h-4" />
                                    0458 717 810
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@taskerway.com.au"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiMail className="w-4 h-4" />
                                    support@taskerway.com.au
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <FiMapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>Postbox address - Coming Soon</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Business Hours</h3>
                        <div className="text-gray-400 space-y-2">
                            <p className="font-semibold text-white">Available 24/7</p>
                            <p className="text-sm">
                                Weekend service available upon special request or emergency
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Taskerway. All rights reserved.
                        </p>
                        <p className="flex items-center gap-1 text-gray-400 text-sm">
                            Made with <FiHeart className="w-4 h-4 text-red-500" /> in Australia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
