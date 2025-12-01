// EmailJS configuration
// To set up EmailJS:
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create email templates
// 4. Replace the IDs below with your actual EmailJS IDs

const EMAILJS_SERVICE_ID = 'service_j1it8n7';
const EMAILJS_TEMPLATE_ID_AIRPORT = 'template_uvnmczx';
const EMAILJS_TEMPLATE_ID_SERVICE = 'template_uvnmczx';
const EMAILJS_PUBLIC_KEY = 'h7cnMVE1nufu98OC7';

// Initialize EmailJS
import emailjs from '@emailjs/browser';
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendAirportBookingEmail = async (bookingData) => {
    // Prepare email parameters
    const emailParams = {
        to_email: bookingData.email,
        customer_name: bookingData.name,
        service_type: bookingData.serviceType === 'pick' ? 'Airport Pickup' : 'Airport Drop-off',
        passenger_count: bookingData.passengerCount,
        phone: bookingData.phone,
        pickup_address: bookingData.pickupAddress || 'Airport',
        dropoff_address: bookingData.dropoffAddress || 'Airport',
        date: bookingData.date,
        time: bookingData.time,
        reply_to: 'support@taskerway.com.au',
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_AIRPORT,
        emailParams
      );
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }

    // Simulate async operation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'success', message: 'Email simulated' });
        }, 1000);
    });
};

export const sendServiceBookingEmail = async (bookingData) => {
    const emailParams = {
        to_email: bookingData.email,
        customer_name: bookingData.name,
        service_type: bookingData.serviceType,
        phone: bookingData.phone,
        address: bookingData.address,
        date: bookingData.date,
        time: bookingData.time || 'Not specified',
        description: bookingData.description,
        budget: bookingData.budget || 'Not specified',
        reply_to: 'support@taskerway.com.au',
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_SERVICE,
        emailParams
      );
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'success', message: 'Email simulated' });
        }, 1000);
    });
};