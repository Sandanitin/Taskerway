# EmailJS Error Fix Guide

Based on your console logs showing "EmailJS failed with detailed error", here's how to diagnose and fix the issue:

## Enhanced Error Logging

I've updated the error logging in your application to show more detailed information. When you submit a booking form again, you should now see a comprehensive error report in the console that looks like this:

```
=== EMAILJS DETAILED ERROR REPORT ===
EmailJS failed with comprehensive error details:
Basic Error Info: {
  message: "...",
  status: "...",
  text: "...",
  stack: "..."
}
Response Details: {
  status: "...",
  statusText: "...",
  data: "...",
  headers: "..."
}
```

## Common Error Codes and Solutions

### Error 401 - Unauthorized
**Cause**: Incorrect public key
**Fix**: 
1. Log in to https://www.emailjs.com/
2. Go to Account -> API Keys
3. Copy your Public Key
4. Update it in `src/utils/emailService.js`:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_j1it8n7',
  TEMPLATE_ID_AIRPORT: 'template_n82z5se',
  TEMPLATE_ID_SERVICE: 'template_uvnmczx',
  PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY_HERE'  // ← Update this
};
```

### Error 404 - Not Found
**Cause**: Incorrect service or template ID
**Fix**:
1. Log in to https://www.emailjs.com/
2. Verify these exact IDs exist:
   - Service ID: `service_j1it8n7`
   - Airport Template ID: `template_n82z5se`
   - Service Template ID: `template_uvnmczx`
3. If any IDs are different, update them in `src/utils/emailService.js`

### Error 400 - Bad Request
**Cause**: Template variables don't match exactly
**Fix**:
1. Go to your EmailJS templates
2. Verify ALL variables match exactly (case-sensitive):

**Airport Template Variables**:
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

**Service Template Variables**:
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

### Error 429 - Too Many Requests
**Cause**: Exceeded rate limits
**Fix**: Wait a few minutes and try again, or upgrade your EmailJS plan

## Immediate Action Steps

1. **Submit a booking form again** and check the enhanced error logs
2. **Look for the specific error code** (401, 404, 400, etc.)
3. **Apply the corresponding fix** from above

## Manual Verification Process

1. **Test Service Connection**:
   - Go to EmailJS dashboard
   - Find your service "service_j1it8n7"
   - Click "Test" button
   - Enter a test email and send
   - Verify it works

2. **Test Templates**:
   - Go to each template
   - Click "Test" button
   - Fill in ALL required variables exactly
   - Send test email

## Domain Whitelist Check

If you get CORS errors:
1. In EmailJS dashboard, go to Account Settings
2. Find "Domains Whitelist"
3. Add your domains:
   - For local development: `http://localhost:3000`
   - For production: your actual domain

## If Still Not Working

1. **Create a new service**:
   - Delete current service
   - Create new one
   - Connect to email provider
   - Update service ID in code

2. **Create new templates**:
   - Delete current templates
   - Create new ones with exact variables
   - Update template IDs in code

## Contact Support

If none of these steps work:
1. Contact EmailJS support: https://www.emailjs.com/contact-us/
2. Provide:
   - Full error message from console
   - Your account email
   - Service and template IDs
   - Screenshots of your configuration