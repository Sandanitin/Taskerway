# Email Issue Diagnosis Checklist

Since you're seeing the success message but not receiving emails, the EmailJS integration is likely failing and falling back to mock responses. Follow this checklist to diagnose and fix the issue:

## 1. Check Browser Console for Errors

1. Open your website in Chrome/Firefox
2. Press F12 to open Developer Tools
3. Click on the "Console" tab
4. Submit a booking form
5. Look for these specific messages:
   - "EmailJS initialized successfully" (if working)
   - "EmailJS failed with detailed error" (if failing)
   - "Email was sent via mock service" (indicates EmailJS is not working)

## 2. Common EmailJS Issues

### Issue 1: Incorrect Service Configuration
- Log in to https://www.emailjs.com/
- Go to "Email Services"
- Verify that service "service_j1it8n7" exists and is properly connected
- Check that your email provider (Gmail, Outlook, etc.) is connected

### Issue 2: Template Problems
- Go to "Email Templates" in EmailJS
- Verify templates exist:
  - Airport: "template_n82z5se"
  - Service: "template_uvnmczx"
- Check that template variables match what's being sent

### Issue 3: Account Limits
- Check if you've exceeded the free tier limit (200 emails/month)
- Verify your account is active and in good standing

## 3. Test with Email Test Page

1. Navigate to `/email-test` on your website
2. Click "Test Service Email" or "Test Airport Email"
3. Check the console for detailed error messages
4. Look specifically for:
   - 401 Unauthorized errors (wrong public key)
   - 404 Not Found errors (wrong template/service IDs)
   - 400 Bad Request errors (missing template variables)

## 4. Verify Template Variables

### Airport Booking Template (template_n82z5se)
Must include these exact variables:
```
{{to_email}}
{{customer_name}}
{{service_type}}
{{passenger_count}}
{{phone}}
{{pickup_address}}
{{dropoff_address}}
{{date}}
{{time}}
{{reply_to}}
```

### Service Booking Template (template_uvnmczx)
Must include these exact variables:
```
{{to_email}}
{{customer_name}}
{{service_type}}
{{phone}}
{{address}}
{{date}}
{{time}}
{{description}}
{{budget}}
{{reply_to}}
```

## 5. Manual EmailJS Test

1. In your EmailJS dashboard:
   - Find your service "service_j1it8n7"
   - Find your templates
   - Use the built-in "Test" button
   - Fill in sample data and send a test email

## 6. Check Network Tab

1. Open Developer Tools
2. Go to the "Network" tab
3. Submit a booking form
4. Look for requests to EmailJS endpoints
5. Check response status codes and error messages

## 7. Verify Configuration in Code

In `src/utils/emailService.js`, verify:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_j1it8n7',           // Must match your service
  TEMPLATE_ID_AIRPORT: 'template_n82z5se', // Must match your template
  TEMPLATE_ID_SERVICE: 'template_uvnmczx', // Must match your template
  PUBLIC_KEY: 'h7cnMVE1nufu98OC7'          // Must match your public key
};
```

## 8. Common Solutions

### If getting 401 Unauthorized:
- Double-check your public key in EmailJS dashboard
- Ensure there are no extra spaces in the key

### If getting 404 Not Found:
- Verify service and template IDs exist
- Check for typos in the IDs

### If getting 400 Bad Request:
- Ensure all required template variables are present
- Check for typos in variable names

## 9. Alternative Testing

Try sending a test email directly with this JavaScript in the browser console:
```javascript
// This is for testing only - don't use in production
emailjs.send("service_j1it8n7", "template_n82z5se", {
  to_email: "your-test-email@example.com",
  customer_name: "Test User",
  service_type: "Airport Pickup",
  passenger_count: "2",
  phone: "123-456-7890",
  pickup_address: "Test Pickup Address",
  dropoff_address: "Test Dropoff Address",
  date: "2023-12-01",
  time: "10:00 AM",
  reply_to: "support@taskerway.com.au"
});
```

## 10. Contact Support

If none of these steps work:
1. Contact EmailJS support at https://www.emailjs.com/contact-us/
2. Provide them with:
   - Your account email
   - Service ID: service_j1it8n7
   - Error messages from the console
   - Screenshot of your service/template configuration