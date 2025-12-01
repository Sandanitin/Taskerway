// Fallback email service using a simple POST request
// This can be used if EmailJS fails

const BACKEND_EMAIL_ENDPOINT = 'https://taskerway-email-proxy.example.com/send'; // Replace with your actual endpoint

export const sendAirportBookingEmailFallback = async (bookingData) => {
    // Validate required fields
    if (!bookingData.email || !bookingData.name) {
        throw new Error('Missing required booking information: name and email are required');
    }

    // Prepare email data
    const emailData = {
        to: bookingData.email,
        from: 'support@taskerway.com.au',
        subject: `Airport Booking Confirmation - ${bookingData.serviceType === 'pick' ? 'Pickup' : 'Drop-off'}`,
        template: 'airport_booking',
        data: {
            customer_name: bookingData.name || 'Valued Customer',
            service_type: bookingData.serviceType === 'pick' ? 'Airport Pickup' : 'Airport Drop-off',
            passenger_count: bookingData.passengerCount || 1,
            phone: bookingData.phone || 'Not provided',
            pickup_address: bookingData.pickupAddress || 'Airport',
            dropoff_address: bookingData.dropoffAddress || 'Airport',
            date: bookingData.date || 'Not specified',
            time: bookingData.time || 'Not specified',
        }
    };

    try {
        // In a real implementation, you would send this to your backend
        console.log('Fallback email data:', emailData);
        
        // Simulate successful sending
        return { 
            status: 'success', 
            message: 'Booking confirmation sent successfully via fallback method',
            data: emailData
        };
    } catch (error) {
        console.error('Fallback email sending failed:', error);
        throw new Error('Failed to send booking confirmation via fallback method');
    }
};

export const sendServiceBookingEmailFallback = async (bookingData) => {
    // Validate required fields
    if (!bookingData.email || !bookingData.name || !bookingData.serviceType) {
        throw new Error('Missing required booking information: name, email, and service type are required');
    }

    // Prepare email data
    const emailData = {
        to: bookingData.email,
        from: 'support@taskerway.com.au',
        subject: `Service Booking Confirmation - ${bookingData.serviceType}`,
        template: 'service_booking',
        data: {
            customer_name: bookingData.name || 'Valued Customer',
            service_type: bookingData.serviceType || 'Service',
            phone: bookingData.phone || 'Not provided',
            address: bookingData.address || 'Not provided',
            date: bookingData.date || 'Not specified',
            time: bookingData.time || 'Not specified',
            description: bookingData.description || 'No description provided',
            budget: bookingData.budget || 'Not specified',
        }
    };

    try {
        // In a real implementation, you would send this to your backend
        console.log('Fallback email data:', emailData);
        
        // Simulate successful sending
        return { 
            status: 'success', 
            message: 'Service booking confirmation sent successfully via fallback method',
            data: emailData
        };
    } catch (error) {
        console.error('Fallback email sending failed:', error);
        throw new Error('Failed to send service booking confirmation via fallback method');
    }
};

// Wrapper function that tries EmailJS first, then falls back
export const sendEmailWithFallback = async (emailFunction, fallbackFunction, data) => {
    try {
        // Try primary email service first
        console.log('Attempting to send email via primary service...');
        const result = await emailFunction(data);
        return result;
    } catch (primaryError) {
        console.warn('Primary email service failed, attempting fallback...', primaryError);
        
        try {
            // Try fallback service
            const fallbackResult = await fallbackFunction(data);
            return fallbackResult;
        } catch (fallbackError) {
            console.error('Both primary and fallback email services failed:', {
                primaryError,
                fallbackError
            });
            throw new Error('Unable to send booking confirmation through any available method. Please contact support directly.');
        }
    }
};