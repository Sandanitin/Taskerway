import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiMapPin, FiCalendar, FiDollarSign, FiEdit3, FiBriefcase, FiLoader, FiX } from 'react-icons/fi';
import { sendUnifiedBookingEmail } from '../utils/emailService';

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('post');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const [taskData, setTaskData] = useState({
        title: '', dateOption: 'flexible', selectedDate: '', location: '',
        details: '', budget: '', name: '', email: '', phone: ''
    });

    const [taskerData, setTaskerData] = useState({
        name: '', email: '', phone: '', skills: '', experience: ''
    });

    const openModal = (tab) => {
        setActiveTab(tab);
        setShowModal(true);
        setSubmitStatus({ type: '', message: '' });
    };

    const closeModal = () => {
        setShowModal(false);
        setSubmitStatus({ type: '', message: '' });
    };

    const handleTaskInputChange = (field, value) => {
        setTaskData(prev => ({ ...prev, [field]: value }));
        setSubmitStatus({ type: '', message: '' });
    };

    const handleTaskerInputChange = (field, value) => {
        setTaskerData(prev => ({ ...prev, [field]: value }));
        setSubmitStatus({ type: '', message: '' });
    };

    const handlePostTask = async () => {
        if (!taskData.title || !taskData.name || !taskData.email) {
            setSubmitStatus({ type: 'error', message: 'Please fill in Title, Name, and Email.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const dateString = taskData.dateOption === 'flexible' ? "I'm flexible" : `${taskData.dateOption === 'onDate' ? 'On' : 'Before'} ${taskData.selectedDate}`;
            await sendUnifiedBookingEmail({
                name: taskData.name, email: taskData.email, phone: taskData.phone,
                serviceType: 'Task Request',
                description: `Task: ${taskData.title}\n\nDetails: ${taskData.details}\n\nDate Preference: ${dateString}`,
                address: taskData.location, budget: taskData.budget, date: dateString
            });
            setSubmitStatus({ type: 'success', message: 'Task posted successfully!' });
            setTaskData({ title: '', dateOption: 'flexible', selectedDate: '', location: '', details: '', budget: '', name: '', email: '', phone: '' });
            setTimeout(() => closeModal(), 2000);
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to post task. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBecomeTasker = async () => {
        if (!taskerData.name || !taskerData.email) {
            setSubmitStatus({ type: 'error', message: 'Please fill in Name and Email.' });
            return;
        }
        setIsSubmitting(true);
        try {
            await sendUnifiedBookingEmail({
                name: taskerData.name, email: taskerData.email, phone: taskerData.phone,
                serviceType: 'Tasker Application',
                description: `Skills: ${taskerData.skills}\n\nExperience: ${taskerData.experience}`
            });
            setSubmitStatus({ type: 'success', message: 'Application submitted!' });
            setTaskerData({ name: '', email: '', phone: '', skills: '', experience: '' });
            setTimeout(() => closeModal(), 2000);
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
            }}>
                <div className="absolute inset-0 bg-black/80"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                                Get Anything Done with{' '}
                                <span className="relative inline-block">
                                    Taskerway
                                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute bottom-1 sm:bottom-2 left-0 h-2 sm:h-3 bg-yellow-400 opacity-30" />
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                            From airport transfers to home services, find the help you need. Professional, reliable, and available 24/7.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
                            <button onClick={() => openModal('post')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                                Post your task for free
                                <FiArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={() => openModal('earn')} className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-base rounded-full transition-all duration-300">
                                Earn money as a Tasker
                            </button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-wrap gap-3 justify-center">
                            {[{ icon: FiCheckCircle, text: '24/7 Available' }, { icon: FiCheckCircle, text: 'Professional Service' }, { icon: FiCheckCircle, text: 'Quick Response' }].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                                    <feature.icon className="w-4 h-4 text-yellow-300" />
                                    <span className="font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
                    </svg>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <div className="flex gap-2">
                                    <button onClick={() => { setActiveTab('post'); setSubmitStatus({ type: '', message: '' }); }} className={`px-4 py-2 rounded-full font-semibold transition-all ${activeTab === 'post' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        <FiEdit3 className="inline w-4 h-4 mr-1" />Post a task
                                    </button>
                                    <button onClick={() => { setActiveTab('earn'); setSubmitStatus({ type: '', message: '' }); }} className={`px-4 py-2 rounded-full font-semibold transition-all ${activeTab === 'earn' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        <FiBriefcase className="inline w-4 h-4 mr-1" />Earn money
                                    </button>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full"><FiX className="w-5 h-5 text-gray-500" /></button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'post' ? (
                                        <motion.div key="post" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Let's start with the basics</h3>
                                            <p className="text-gray-500 text-sm mb-5">In a few words, what do you need done?</p>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                                <div className="relative">
                                                    <FiEdit3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input type="text" placeholder="e.g. Help move my sofa" value={taskData.title} onChange={(e) => handleTaskInputChange('title', e.target.value)} className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">When do you need this done?</label>
                                                <div className="grid grid-cols-3 gap-2 mb-2">
                                                    {[{ id: 'onDate', label: 'On date' }, { id: 'beforeDate', label: 'Before date' }, { id: 'flexible', label: "I'm flexible" }].map((option) => (
                                                        <button key={option.id} type="button" onClick={() => handleTaskInputChange('dateOption', option.id)} className={`py-2 text-sm font-medium rounded-lg border-2 transition-all ${taskData.dateOption === option.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>{option.label}</button>
                                                    ))}
                                                </div>
                                                {taskData.dateOption !== 'flexible' && (
                                                    <div className="relative">
                                                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                        <input type="date" value={taskData.selectedDate} onChange={(e) => handleTaskInputChange('selectedDate', e.target.value)} className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                <div className="relative">
                                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input type="text" placeholder="Enter your suburb or city" value={taskData.location} onChange={(e) => handleTaskInputChange('location', e.target.value)} className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                                                <textarea placeholder="Describe what you need help with..." value={taskData.details} onChange={(e) => handleTaskInputChange('details', e.target.value)} rows={2} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                                <div className="relative">
                                                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input type="number" placeholder="What's your budget?" value={taskData.budget} onChange={(e) => handleTaskInputChange('budget', e.target.value)} className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                </div>
                                            </div>

                                            <div className="border-t pt-4 mt-4">
                                                <p className="text-sm font-medium text-gray-700 mb-3">Your Contact Info</p>
                                                <div className="space-y-3">
                                                    <input type="text" placeholder="Your Name *" value={taskData.name} onChange={(e) => handleTaskInputChange('name', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                    <input type="email" placeholder="Your Email *" value={taskData.email} onChange={(e) => handleTaskInputChange('email', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                    <input type="tel" placeholder="Your Phone" value={taskData.phone} onChange={(e) => handleTaskInputChange('phone', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                                                </div>
                                            </div>

                                            {submitStatus.message && <div className={`mt-4 p-3 rounded-xl text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{submitStatus.message}</div>}

                                            <button onClick={handlePostTask} disabled={isSubmitting} className="w-full mt-5 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                                                {isSubmitting ? <><FiLoader className="w-5 h-5 animate-spin" />Posting...</> : <>Post your task for free<FiArrowRight className="w-5 h-5" /></>}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="earn" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                    <FiBriefcase className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Earn money as a Tasker</h3>
                                                <p className="text-gray-500 text-sm">Put your skills to work. Pick the tasks you want.</p>
                                            </div>

                                            <div className="space-y-2 mb-6">
                                                {['Choose tasks that suit your skills', 'Set your own schedule', 'Get paid securely', 'Build your reputation'].map((benefit, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700 text-sm">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                <input type="text" placeholder="Your Name *" value={taskerData.name} onChange={(e) => handleTaskerInputChange('name', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none" />
                                                <input type="email" placeholder="Your Email *" value={taskerData.email} onChange={(e) => handleTaskerInputChange('email', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none" />
                                                <input type="tel" placeholder="Your Phone" value={taskerData.phone} onChange={(e) => handleTaskerInputChange('phone', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none" />
                                                <input type="text" placeholder="Your Skills (e.g., cleaning, moving)" value={taskerData.skills} onChange={(e) => handleTaskerInputChange('skills', e.target.value)} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none" />
                                                <textarea placeholder="Tell us about your experience..." value={taskerData.experience} onChange={(e) => handleTaskerInputChange('experience', e.target.value)} rows={2} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none resize-none" />
                                            </div>

                                            {submitStatus.message && <div className={`mt-4 p-3 rounded-xl text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{submitStatus.message}</div>}

                                            <button onClick={handleBecomeTasker} disabled={isSubmitting} className="w-full mt-5 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                                                {isSubmitting ? <><FiLoader className="w-5 h-5 animate-spin" />Submitting...</> : 'Become a Tasker'}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Hero;
