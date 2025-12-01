import React, { useState } from 'react';
import { sendAirportBookingEmail, sendServiceBookingEmail, sendContactFormEmail, testEmailJSConnection } from '../utils/emailService';

const EmailTest = () => {
    const [testResult, setTestResult] = useState(null);
    const [isTesting, setIsTesting] = useState(false);
    const [testType, setTestType] = useState('');

    const testConnection = async () => {
        setIsTesting(true);
        setTestType('connection');
        setTestResult(null);
        
        try {
            console.log('Testing EmailJS connection...');
            const result = await testEmailJSConnection();
            setTestResult({ success: result.success, message: result.message, data: result });
        } catch (error) {
            console.error('Connection test failed:', error);
            setTestResult({ success: false, message: error.message, error: error });
        } finally {
            setIsTesting(false);
        }
    };

    const testServiceEmail = async () => {
        setIsTesting(true);
        setTestType('service');
        setTestResult(null);
        
        try {
            const testData = {
                email: 'test@example.com',
                name: 'Test User',
                serviceType: 'IT Solutions',
                phone: '123-456-7890',
                address: '123 Test Street',
                date: '2023-12-01',
                time: '10:00 AM',
                description: 'Test service booking',
                budget: '$100-200'
            };
            
            console.log('Testing service email with data:', testData);
            const result = await sendServiceBookingEmail(testData);
            setTestResult({ success: true, message: 'Service email test successful', data: result });
        } catch (error) {
            console.error('Service email test failed:', error);
            setTestResult({ success: false, message: error.message, error: error });
        } finally {
            setIsTesting(false);
        }
    };

    const testAirportEmail = async () => {
        setIsTesting(true);
        setTestType('airport');
        setTestResult(null);
        
        try {
            const testData = {
                email: 'test@example.com',
                name: 'Test User',
                serviceType: 'Airport Pickup',
                passengerCount: 2,
                phone: '123-456-7890',
                pickupAddress: 'Sydney Airport',
                dropoffAddress: '123 Test Street',
                date: '2023-12-01',
                time: '10:00 AM'
            };
            
            console.log('Testing airport email with data:', testData);
            const result = await sendAirportBookingEmail(testData);
            setTestResult({ success: true, message: 'Airport email test successful', data: result });
        } catch (error) {
            console.error('Airport email test failed:', error);
            setTestResult({ success: false, message: error.message, error: error });
        } finally {
            setIsTesting(false);
        }
    };

    const testContactEmail = async () => {
        setIsTesting(true);
        setTestType('contact');
        setTestResult(null);
        
        try {
            const testData = {
                email: 'test@example.com',
                name: 'Test User',
                serviceType: 'Contact Form Inquiry',
                subject: 'Test Contact Form Submission',
                description: 'This is a test message from the contact form.',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };
            
            console.log('Testing contact form email with data:', testData);
            const result = await sendContactFormEmail(testData);
            setTestResult({ success: true, message: 'Contact form email test successful', data: result });
        } catch (error) {
            console.error('Contact form email test failed:', error);
            setTestResult({ success: false, message: error.message, error: error });
        } finally {
            setIsTesting(false);
        }
    };

    const clearResults = () => {
        setTestResult(null);
        setTestType('');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Email Service Test</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Test Email Services</h3>
                <p className="text-gray-600 mb-4">
                    Use these buttons to test the email service functionality. 
                    Check the browser console for detailed logs.
                </p>
                
                <div className="flex gap-4 mb-4 flex-wrap">
                    <button
                        onClick={testConnection}
                        disabled={isTesting}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                    >
                        {isTesting && testType === 'connection' ? 'Testing...' : 'Test Connection'}
                    </button>
                    
                    <button
                        onClick={testServiceEmail}
                        disabled={isTesting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isTesting && testType === 'service' ? 'Testing...' : 'Test Service Email'}
                    </button>
                    
                    <button
                        onClick={testAirportEmail}
                        disabled={isTesting}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                        {isTesting && testType === 'airport' ? 'Testing...' : 'Test Airport Email'}
                    </button>
                    
                    <button
                        onClick={testContactEmail}
                        disabled={isTesting}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
                    >
                        {isTesting && testType === 'contact' ? 'Testing...' : 'Test Contact Email'}
                    </button>
                    
                    <button
                        onClick={clearResults}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Clear Results
                    </button>
                </div>
                
                {testResult && (
                    <div className={`p-4 rounded-md ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <p className="font-semibold">{testResult.message}</p>
                        {testResult.data && (
                            <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded">
                                {JSON.stringify(testResult.data, null, 2)}
                            </pre>
                        )}
                        {testResult.error && (
                            <div className="mt-2">
                                <p className="font-medium">Error Details:</p>
                                <pre className="mt-1 text-xs overflow-auto bg-white p-2 rounded">
                                    {JSON.stringify({
                                        message: testResult.error.message,
                                        status: testResult.error.status,
                                        text: testResult.error.text
                                    }, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">EmailJS Configuration</h3>
                <p className="text-gray-600 mb-4">
                    Current configuration in <code className="bg-gray-100 px-1 rounded">src/utils/emailService.js</code>:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Service ID: <code className="bg-gray-100 px-1 rounded">service_j1it8n7</code></li>
                    <li>Template ID: <code className="bg-gray-100 px-1 rounded">template_uvnmczx</code></li>
                    <li>Public Key: <code className="bg-gray-100 px-1 rounded">h7cnMVE1nufu98OC7</code></li>
                </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Troubleshooting Steps</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Open browser developer tools (F12) and check the Console tab for errors</li>
                    <li>Verify your EmailJS account is active at https://www.emailjs.com/</li>
                    <li>Check that the template exists with ID: <code className="bg-gray-100 px-1 rounded">template_uvnmczx</code></li>
                    <li>Ensure your EmailJS service (service_j1it8n7) is properly connected</li>
                    <li>Check that your template has the correct variable names</li>
                    <li>Verify your EmailJS account hasn't exceeded usage limits</li>
                </ol>
            </div>
        </div>
    );
};

export default EmailTest;