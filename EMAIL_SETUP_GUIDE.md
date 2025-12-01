# EmailJS Setup Guide for Taskerway

To fix the email sending issues, you need to set up EmailJS with your own credentials. Follow these steps:

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (follow the OAuth flow)
5. Note the Service ID (you'll need this later)

## 3. Create Email Templates

### Airport Booking Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Give it a name like "Airport Booking Confirmation"
4. Set up the template with this content:

```
Subject: Airport Booking Confirmation - {{service_type}}

Dear {{customer_name}},

Thank you for booking with Taskerway!

Booking Details:
- Service Type: {{service_type}}
- Passenger Count: {{passenger_count}}
- Phone: {{phone}}
- Pickup Address: {{pickup_address}}
- Drop-off Address: {{dropoff_address}}
- Date: {{date}}
- Time: {{time}}

Our team will contact you shortly to confirm your booking.

Best regards,
Taskerway Team
```

5. Note the Template ID (you'll need this later)

### Service Booking Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Give it a name like "Service Booking Confirmation"
4. Set up the template with this content:

```
Subject: Service Booking Confirmation - {{service_type}}

Dear {{customer_name}},

Thank you for booking a service with Taskerway!

Booking Details:
- Service Type: {{service_type}}
- Phone: {{phone}}
- Address: {{address}}
- Date: {{date}}
- Time: {{time}}
- Description: {{description}}
- Budget: {{budget}}

Our team will contact you shortly to confirm your booking.

Best regards,
Taskerway Team
```

5. Note the Template ID (you'll need this later)

## 4. Get Your Public Key

1. Go to your EmailJS dashboard
2. Your Public Key is displayed at the top of the page
3. Note this key (you'll need it later)

## 5. Update Your Application

Open `src/utils/emailService.js` and replace these placeholder values:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',           // Replace with your actual Service ID
  TEMPLATE_ID_AIRPORT: 'YOUR_AIRPORT_TEMPLATE_ID',  // Replace with your Airport template ID
  TEMPLATE_ID_SERVICE: 'YOUR_SERVICE_TEMPLATE_ID',  // Replace with your Service template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'            // Replace with your actual Public Key
};
```

## 6. Test the Emails

1. Save your changes
2. Restart your development server
3. Try submitting a booking form
4. Check your email to confirm receipt

## Troubleshooting

If emails still aren't sending:

1. Check browser console for error messages
2. Verify all IDs are correctly entered
3. Make sure your email service is properly connected in EmailJS
4. Check that your templates don't have syntax errors
5. Ensure you haven't exceeded EmailJS free tier limits

## Alternative Solution

If you prefer not to use EmailJS, you can:

1. Set up a simple backend service with Node.js and Nodemailer
2. Use a service like Formspree or Formspark for form submissions
3. Integrate with your existing email infrastructure

Contact support if you need help with any of these alternatives.