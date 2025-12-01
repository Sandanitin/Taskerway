# EmailJS Troubleshooting Guide

If you're not receiving emails, follow these steps to diagnose and fix the issue:

## 1. Check Browser Console for Errors

1. Open your website in a browser
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Try submitting a booking form
5. Look for any error messages related to EmailJS

Common errors:
- "401 Unauthorized" - Incorrect service ID or public key
- "404 Not Found" - Incorrect template ID
- "400 Bad Request" - Missing required template variables
- "429 Too Many Requests" - Exceeded rate limits

## 2. Verify EmailJS Account and Configuration

1. Go to https://www.emailjs.com/ and log in to your account
2. Check that your service "service_j1it8n7" exists and is properly connected
3. Verify that templates "template_n82z5se" and "template_uvnmczx" exist
4. Check that your account is active and within usage limits

## 3. Check Template Variables

Make sure your EmailJS templates have the correct variable names:

### Airport Booking Template (template_n82z5se)
Should include these variables:
- `to_email`
- `customer_name`
- `service_type`
- `passenger_count`
- `phone`
- `pickup_address`
- `dropoff_address`
- `date`
- `time`
- `reply_to`

### Service Booking Template (template_uvnmczx)
Should include these variables:
- `to_email`
- `customer_name`
- `service_type`
- `phone`
- `address`
- `date`
- `time`
- `description`
- `budget`
- `reply_to`

## 4. Test with the Email Test Page

1. Navigate to `/email-test` on your website
2. Click "Test Service Email" or "Test Airport Email"
3. Check the console for detailed logs
4. Look for success or error messages

## 5. Common Issues and Solutions

### Issue: "401 Unauthorized"
**Solution**: Verify your public key is correct in `src/utils/emailService.js`

### Issue: "404 Not Found"
**Solution**: Verify your template IDs exist in your EmailJS dashboard

### Issue: "400 Bad Request"
**Solution**: Check that all required variables are present in your templates

### Issue: "Service not found"
**Solution**: Verify your service ID and that the service is properly connected

## 6. Manual Testing

You can also test your EmailJS configuration manually:

1. Go to your EmailJS dashboard
2. Find your service and templates
3. Use the "Test" button on each template
4. Fill in sample data and send a test email

## 7. Check Email Deliverability

If emails are being sent but not received:
1. Check spam/junk folders
2. Verify the recipient email address is correct
3. Check EmailJS delivery logs in your dashboard
4. Ensure your email service provider isn't blocking the emails

## 8. Rate Limiting

EmailJS has rate limits:
- Free tier: 200 emails per month
- If you exceed limits, emails will fail with a 429 error

## 9. Contact Support

If you're still having issues:
1. Check the EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support: https://www.emailjs.com/contact-us/
3. Verify your account status and billing information

## 10. Alternative Solutions

If EmailJS continues to have issues:
1. Consider using a backend email service with Nodemailer
2. Try alternative services like Formspree or Formspark
3. Set up a simple Node.js server with email capabilities