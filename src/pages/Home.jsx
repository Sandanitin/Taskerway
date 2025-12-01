import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
// import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Hero />
            
            {/* Services Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <Services />
                </div>
            </section>
            
            {/* About Section */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Why Choose <span className="gradient-text">Taskerway</span>?
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                At Taskerway, we understand that life gets busy. That's why we're here to take care of all your everyday tasks, from airport transfers to home maintenance, so you can focus on what matters most to you.
                            </p>
                            <p className="text-gray-600 text-lg mb-6">
                                Our team of professionals is vetted, trained, and committed to delivering exceptional service with reliability and punctuality. We pride ourselves on our 24/7 availability and quick response times.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                                    <span className="text-gray-700">Licensed & Insured</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                                    <span className="text-gray-700">24/7 Availability</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                                    <span className="text-gray-700">Transparent Pricing</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                                    <span className="text-gray-700">Satisfaction Guarantee</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80" 
                                alt="Professional Team" 
                                className="w-full h-96 object-cover rounded-xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                                <div className="text-3xl font-bold text-primary">10+</div>
                                <div className="text-gray-600">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* How It Works */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How <span className="gradient-text">It Works</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Getting help has never been easier. Just follow these simple steps.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Choose Service',
                                description: 'Browse our wide range of services and select what you need.'
                            },
                            {
                                step: '02',
                                title: 'Book Online',
                                description: 'Provide details and schedule at your convenience.'
                            },
                            {
                                step: '03',
                                title: 'We Handle It',
                                description: 'Our professionals arrive and complete the task.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Contact section removed from home page */}
        </div>
    );
};

export default Home;