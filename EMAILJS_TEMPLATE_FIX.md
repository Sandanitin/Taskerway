# EmailJS Template Fix Guide

You're receiving the error "Template: One or more dynamic variables are corrupted" which indicates there's an issue with how variables are being used in your EmailJS template. Here's how to fix it:

## Common Causes and Solutions

### 1. **Corrupted Conditional Logic**
The most common cause is incorrect conditional syntax in EmailJS templates.

**Problematic Syntax:**
```
{{#if is_airport_service}}
Content here
{{/if}}
```

**EmailJS-Compatible Syntax:**
```
{{is_airport_service}}
Content here
{{/is_airport_service}}
```

### 2. **Special Characters in Variables**
Variables with special characters or spaces can cause issues.

**Problematic:**
```
{{passenger count}}
{{drop-off address}}
```

**Fixed:**
```
{{passenger_count}}
{{dropoff_address}}
```

## Steps to Fix Your Template

### Step 1: Access Your Template
1. Log in to your EmailJS account at https://www.emailjs.com/
2. Go to "Email Templates"
3. Find your template with ID: `template_uvnmczx`
4. Click "Edit"

### Step 2: Replace with This Working Template

Replace the entire template content with this simplified version:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Taskerway Service Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Taskerway Confirmation</h1>
            <p>Thank you for choosing Taskerway</p>
        </div>
        
        <div class="content">
            <p>Hello {{customer_name}},</p>
            
            <div class="section">
                <p>We've received your {{service_type}} request and will contact you within 24 hours.</p>
            </div>
            
            <div class="section">
                <p><span class="label">Service Type:</span> {{service_type}}</p>
                <p><span class="label">Date:</span> {{date}}</p>
                <p><span class="label">Time:</span> {{time}}</p>
                <p><span class="label">Phone:</span> {{phone}}</p>
            </div>
            
            {{is_airport_service}}
            <div class="section">
                <h3>Airport Transfer Details:</h3>
                <p><span class="label">Passenger Count:</span> {{passenger_count}}</p>
                <p><span class="label">Pickup Address:</span> {{pickup_address}}</p>
                <p><span class="label">Drop-off Address:</span> {{dropoff_address}}</p>
            </div>
            {{/is_airport_service}}
            
            {{is_contact_form}}
            <div class="section">
                <h3>Inquiry Details:</h3>
                <p><span class="label">Subject:</span> {{subject}}</p>
                <p><span class="label">Message:</span> {{description}}</p>
            </div>
            {{/is_contact_form}}
            
            {{description}}
            <div class="section">
                <h3>Service Details:</h3>
                <p><span class="label">Address:</span> {{address}}</p>
                <p><span class="label">Description:</span> {{description}}</p>
                <p><span class="label">Budget:</span> {{budget}}</p>
            </div>
            {{/description}}
            
            <div class="section">
                <p>Our team will review your request and contact you soon.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Taskerway Professional Services</p>
            <p>Email: support@taskerway.com.au | Phone: (02) 1234 5678</p>
            <p>© 2023 Taskerway. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### Step 3: Update Your Template Subject

In the "Subject" field, use this simple subject line:
```
Taskerway {{service_type}} Confirmation
```

### Step 4: Save and Test

1. Click "Save" to save your template
2. Click "Test" to test the template
3. Fill in all variables with test data:
   - `customer_name`: Test User
   - `service_type`: Airport Pickup
   - `date`: 2023-12-01
   - `time`: 10:00 AM
   - `phone`: 123-456-7890
   - `is_airport_service`: true
   - `passenger_count`: 2
   - `pickup_address`: Sydney Airport
   - `dropoff_address`: 123 Main Street
   - `address`: (leave empty)
   - `description`: (leave empty)
   - `budget`: (leave empty)
   - `is_contact_form`: (leave empty)
   - `subject`: (leave empty)

4. Send the test email

## Alternative: Create a New Template

If the existing template continues to have issues:

1. In EmailJS, click "Create New Template"
2. Set Template ID to: `template_uvnmczx_fixed`
3. Use the HTML code above
4. Update your code to use the new template ID by changing this line in `src/utils/emailService.js`:
   ```javascript
   TEMPLATE_ID_UNIFIED: 'template_uvnmczx_fixed',
   ```

## Troubleshooting Tips

1. **Always use simple variable names** without spaces or special characters
2. **For conditional sections**, use the EmailJS format: `{{variable_name}}Content{{/variable_name}}`
3. **Test your template** before using it in production
4. **Check the EmailJS documentation** for the latest syntax requirements

## If Issues Persist

1. Check your browser console for detailed error messages
2. Verify all variable names match exactly between your code and template
3. Contact EmailJS support with the exact error message
4. Consider using a simpler template with fewer conditional sections

The key is to use EmailJS-compatible conditional syntax and ensure all variable names are simple and match exactly.