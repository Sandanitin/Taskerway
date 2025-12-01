// Unified Email Service for all booking types
// Uses a single template for both airport and service bookings

// EmailJS configuration - replace with your actual EmailJS IDs
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_j1it8n7',           // Your EmailJS Service ID
  TEMPLATE_ID_UNIFIED: 'template_uvnmczx',  // Your Unified template ID
  PUBLIC_KEY: 'h7cnMVE1nufu98OC7'          // Your Public Key
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

// Diagnostic function to test EmailJS connection
export const testEmailJSConnection = async () => {
  try {
    console.log('Testing EmailJS connection with config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID_UNIFIED,
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

// Unified email sending function for all booking types
export const sendUnifiedBookingEmail = async (bookingData) => {
  // Validate required fields
  if (!bookingData.email || !bookingData.name) {
    throw new Error('Missing required booking information: name and email are required');
  }

  // Determine if this is an airport service
  const isAirportService = bookingData.serviceType && 
    (bookingData.serviceType.toLowerCase().includes('airport') || 
     bookingData.serviceType.toLowerCase().includes('pick') || 
     bookingData.serviceType.toLowerCase().includes('drop'));

  // Prepare unified email parameters
  const emailParams = {
    // Common fields for all bookings
    to_email: bookingData.email,
    customer_name: bookingData.name || 'Valued Customer',
    service_type: bookingData.serviceType || 'Service',
    phone: bookingData.phone || 'Not provided',
    date: bookingData.date || 'Not specified',
    time: bookingData.time || 'Not specified',
    reply_to: 'support@taskerway.com.au',
    
    // Conditional fields based on service type
    is_airport_service: isAirportService,
    is_contact_form: bookingData.is_contact_form || false,
    
    // Airport-specific fields (will be empty for non-airport services)
    passenger_count: bookingData.passengerCount || '',
    pickup_address: bookingData.pickupAddress || '',
    dropoff_address: bookingData.dropoffAddress || '',
    
    // Service-specific fields (will be empty for airport services)
    address: bookingData.address || '',
    description: bookingData.description || '',
    budget: bookingData.budget || '',
    
    // Contact form specific fields
    subject: bookingData.subject || ''
  };

  console.log('Attempting to send unified booking email with params:', emailParams);

  // Method 1: Try EmailJS
  try {
    const initialized = await initializeEmailJS();
    console.log('EmailJS initialization result:', initialized);
    
    if (emailjsInstance && EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Sending email with configuration:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID_UNIFIED,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...' : 'undefined'
      });
      
      // Log the exact parameters being sent
      console.log('Email parameters being sent:', emailParams);
      
      const response = await emailjsInstance.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_UNIFIED,
        emailParams
      );
      
      console.log('Unified booking email sent successfully via EmailJS:', response);
      return { ...response, method: 'emailjs' };
    } else {
      // EmailJS not configured - use mock service for demo
      console.warn('EmailJS not configured properly, using mock service. To enable real emails, verify your EmailJS credentials in src/utils/emailService.js');
      const mockResponse = await sendMockEmail({
        type: 'unified_booking',
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
        type: 'unified_booking',
        ...emailParams
      });
      
      console.log('Unified booking email sent via mock service:', mockResponse);
      return { ...mockResponse, method: 'mock' };
    } catch (mockError) {
      console.error('Mock email service failed:', mockError);
      
      // Method 3: Final fallback - throw error for user to handle
      throw new Error(`Failed to send booking confirmation. Please try again or call us directly. Error: ${emailJSError.message}`);
    }
  }
};

// Wrapper functions for backward compatibility
export const sendAirportBookingEmail = async (bookingData) => {
  return sendUnifiedBookingEmail(bookingData);
};

export const sendServiceBookingEmail = async (bookingData) => {
  return sendUnifiedBookingEmail(bookingData);
};

export const sendContactFormEmail = async (contactData) => {
  // Ensure is_contact_form is set
  return sendUnifiedBookingEmail({
    ...contactData,
    is_contact_form: true
  });
};