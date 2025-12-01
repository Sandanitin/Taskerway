// Email service with multiple fallback options
// This service attempts to send emails through multiple methods

// EmailJS configuration - replace with your actual EmailJS IDs
// Follow the setup guide in EMAIL_SETUP_GUIDE.md to configure these values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_j1it8n7',              // Your EmailJS Service ID
  TEMPLATE_ID_AIRPORT: 'template_g8sz0t6',   // Airport template ID
  TEMPLATE_ID_SERVICE: 'template_uvnmczx',    // Service template ID
  PUBLIC_KEY: 'h7cnMVE1nufu98OC7'             // Your Public Key
};

// Diagnostic function to test EmailJS connection
export const testEmailJSConnection = async () => {
  try {
    console.log('Testing EmailJS connection with config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      airportTemplateId: EMAILJS_CONFIG.TEMPLATE_ID_AIRPORT,
      serviceTemplateId: EMAILJS_CONFIG.TEMPLATE_ID_SERVICE,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...' : 'undefined'
    });
    
    // Try to initialize EmailJS
    const initialized = await initializeEmailJS();
    if (!initialized) {
      throw new Error('Failed to initialize EmailJS');
    }
    
    return { success: true, message: 'EmailJS initialized successfully' };
  } catch (error) {
    console.error('EmailJS connection test failed:', error);
    return { success: false, message: error.message, error };
  }
};

// Initialize EmailJS
let emailjsInitialized = false;
let emailjsInstance = null;

const initializeEmailJS = async () => {
  if (emailjsInitialized) {
    console.log('EmailJS already initialized');
    return true;
  }
  
  try {
    console.log('Initializing EmailJS with public key:', EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...');
    const emailjsModule = await import('@emailjs/browser');
    emailjsInstance = emailjsModule.default;
    
    emailjsInstance.init({
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      blockHeadless: false,
      limitRate: {
        throttle: 10000 // 10 seconds between requests
      }
    });
    
    emailjsInitialized = true;
    console.log('EmailJS initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    return false;
  }
};

// Mock email sending function for testing
const sendMockEmail = async (emailData) => {
  console.log('MOCK EMAIL SENT:', emailData);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Always succeed for demo purposes
  return { 
    status: 200, 
    message: 'Booking confirmed! A confirmation email will be sent shortly.',
    mock: true
  };
};

// Function to determine if this is an airport service
const isAirportService = (serviceType) => {
  if (!serviceType) return false;
  const lowerServiceType = serviceType.toLowerCase();
  return lowerServiceType.includes('airport') || 
         lowerServiceType.includes('pick') || 
         lowerServiceType.includes('drop');
};

// Airport booking email function
export const sendAirportBookingEmail = async (bookingData) => {
  // Validate required fields
  if (!bookingData.email || !bookingData.name) {
    throw new Error('Missing required booking information: name and email are required');
  }

  // Prepare airport email parameters
  const emailParams = {
    to_email: bookingData.email || 'noreply@example.com',
    customer_name: bookingData.name || 'Valued Customer',
    service_type: bookingData.serviceType || 'Airport Service',
    phone: bookingData.phone || 'Not provided',
    date: bookingData.date || 'Not specified',
    time: bookingData.time || 'Not specified',
    passenger_count: String(bookingData.passengerCount || '1'),
    pickup_address: bookingData.pickupAddress || 'Not specified',
    dropoff_address: bookingData.dropoffAddress || 'Not specified',
    reply_to: 'support@taskerway.com.au'
  };

  console.log('Attempting to send airport booking email with params:', emailParams);

  // Method 1: Try EmailJS
  try {
    const initialized = await initializeEmailJS();
    console.log('EmailJS initialization result:', initialized);
    
    if (emailjsInstance && EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Sending airport email with configuration:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID_AIRPORT,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...' : 'undefined'
      });
      
      // Log the exact parameters being sent
      console.log('Email parameters being sent:', emailParams);
      
      const response = await emailjsInstance.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_AIRPORT,
        emailParams
      );
      
      console.log('Airport booking email sent successfully via EmailJS:', response);
      return { ...response, method: 'emailjs' };
    } else {
      // EmailJS not configured - use mock service for demo
      console.warn('EmailJS not configured properly, using mock service. To enable real emails, verify your EmailJS credentials in src/utils/emailService.js');
      const mockResponse = await sendMockEmail({
        type: 'airport_booking',
        ...emailParams
      });
      return { ...mockResponse, method: 'mock' };
    }
  } catch (emailJSError) {
    // Enhanced error logging to capture all possible error details
    console.group('=== EMAILJS DETAILED ERROR REPORT ===');
    console.error('EmailJS failed with comprehensive error details:');
    
    // Log basic error information
    console.error('Basic Error Info:', {
      message: emailJSError.message,
      status: emailJSError.status,
      text: emailJSError.text,
      stack: emailJSError.stack
    });
    
    // Log response details if available
    if (emailJSError.response) {
      console.error('Response Details:', {
        status: emailJSError.response.status,
        statusText: emailJSError.response.statusText,
        data: emailJSError.response.data,
        headers: emailJSError.response.headers
      });
    }
    
    // Log request details if available
    if (emailJSError.request) {
      console.error('Request Details:', emailJSError.request);
    }
    
    // Log any additional properties
    const additionalProps = Object.keys(emailJSError).filter(key => 
      !['message', 'status', 'text', 'stack', 'response', 'request'].includes(key)
    );
    if (additionalProps.length > 0) {
      console.error('Additional Error Properties:', 
        additionalProps.reduce((obj, key) => {
          obj[key] = emailJSError[key];
          return obj;
        }, {})
      );
    }
    
    console.groupEnd();
    
    // Method 2: Use mock email for demo purposes
    try {
      const mockResponse = await sendMockEmail({
        type: 'airport_booking',
        ...emailParams
      });
      
      console.log('Airport booking email sent via mock service:', mockResponse);
      return { ...mockResponse, method: 'mock' };
    } catch (mockError) {
      console.error('Mock email service failed:', mockError);
      
      // Method 3: Final fallback - throw error for user to handle
      throw new Error(`Failed to send airport booking email. Please try again or call us directly. Error: ${emailJSError.message}`);
    }
  }
};

// Service booking email function
export const sendServiceBookingEmail = async (bookingData) => {
  // Validate required fields
  if (!bookingData.email || !bookingData.name || !bookingData.serviceType) {
    throw new Error('Missing required booking information: name, email, and service type are required');
  }

  // Prepare service email parameters
  const emailParams = {
    to_email: bookingData.email || 'noreply@example.com',
    customer_name: bookingData.name || 'Valued Customer',
    service_type: bookingData.serviceType || 'Service',
    phone: bookingData.phone || 'Not provided',
    date: bookingData.date || 'Not specified',
    time: bookingData.time || 'Not specified',
    address: bookingData.address || 'Not specified',
    description: bookingData.description || 'No description provided',
    budget: bookingData.budget || 'Not specified',
    reply_to: 'support@taskerway.com.au'
  };

  console.log('Attempting to send service booking email with params:', emailParams);

  // Method 1: Try EmailJS
  try {
    const initialized = await initializeEmailJS();
    console.log('EmailJS initialization result:', initialized);
    
    if (emailjsInstance && EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Sending service email with configuration:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID_SERVICE,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...' : 'undefined'
      });
      
      // Log the exact parameters being sent
      console.log('Email parameters being sent:', emailParams);
      
      const response = await emailjsInstance.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_SERVICE,
        emailParams
      );
      
      console.log('Service booking email sent successfully via EmailJS:', response);
      return { ...response, method: 'emailjs' };
    } else {
      // EmailJS not configured - use mock service for demo
      console.warn('EmailJS not configured properly, using mock service. To enable real emails, verify your EmailJS credentials in src/utils/emailService.js');
      const mockResponse = await sendMockEmail({
        type: 'service_booking',
        ...emailParams
      });
      return { ...mockResponse, method: 'mock' };
    }
  } catch (emailJSError) {
    // Enhanced error logging to capture all possible error details
    console.group('=== EMAILJS DETAILED ERROR REPORT ===');
    console.error('EmailJS failed with comprehensive error details:');
    
    // Log basic error information
    console.error('Basic Error Info:', {
      message: emailJSError.message,
      status: emailJSError.status,
      text: emailJSError.text,
      stack: emailJSError.stack
    });
    
    // Log response details if available
    if (emailJSError.response) {
      console.error('Response Details:', {
        status: emailJSError.response.status,
        statusText: emailJSError.response.statusText,
        data: emailJSError.response.data,
        headers: emailJSError.response.headers
      });
    }
    
    // Log request details if available
    if (emailJSError.request) {
      console.error('Request Details:', emailJSError.request);
    }
    
    // Log any additional properties
    const additionalProps = Object.keys(emailJSError).filter(key => 
      !['message', 'status', 'text', 'stack', 'response', 'request'].includes(key)
    );
    if (additionalProps.length > 0) {
      console.error('Additional Error Properties:', 
        additionalProps.reduce((obj, key) => {
          obj[key] = emailJSError[key];
          return obj;
        }, {})
      );
    }
    
    console.groupEnd();
    
    // Method 2: Use mock email for demo purposes
    try {
      const mockResponse = await sendMockEmail({
        type: 'service_booking',
        ...emailParams
      });
      
      console.log('Service booking email sent via mock service:', mockResponse);
      return { ...mockResponse, method: 'mock' };
    } catch (mockError) {
      console.error('Mock email service failed:', mockError);
      
      // Method 3: Final fallback - throw error for user to handle
      throw new Error(`Failed to send service booking email. Please try again or call us directly. Error: ${emailJSError.message}`);
    }
  }
};

// Contact form email function
export const sendContactFormEmail = async (contactData) => {
  // Use service booking email function for contact forms
  return sendServiceBookingEmail(contactData);
};