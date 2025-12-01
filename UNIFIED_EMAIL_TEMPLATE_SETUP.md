# Unified Email Template Setup Guide

This guide explains how to set up a single EmailJS template that works for all services and contact forms in your Taskerway application.

## Benefits of a Unified Template

1. **Simplified Maintenance**: One template to update instead of multiple
2. **Consistent Branding**: Uniform look and feel across all emails
3. **Reduced Configuration**: Fewer template IDs to manage
4. **Easier Troubleshooting**: Single point of failure for email issues

## Setting Up the Unified Template in EmailJS

### Step 1: Create a New Email Template

1. Log in to your EmailJS account at https://www.emailjs.com/
2. Navigate to "Email Templates" in the dashboard
3. Click "Create New Template"
4. Give it a descriptive name like "Unified Booking Confirmation"
5. Set the Template ID to: `template_uvnmczx`

### Step 2: Configure Template Subject

In the "Subject" field, enter:
```
{{#if is_contact_form}}Contact Form Submission{{else}}{{service_type}} Booking Confirmation{{/if}} - Taskerway
```

### Step 3: Configure Template Body

Copy and paste the following HTML into the template editor:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taskerway Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
        }
        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .detail-item {
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            color: #555;
        }
        .detail-value {
            color: #333;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
        .highlight {
            background-color: #dbeafe;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #2563eb;
        }
        @media (max-width: 480px) {
            .details-grid {
                grid-template-columns: 1fr;
            }
            body {
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{#if is_contact_form}}Contact Form Submission{{else}}Booking Confirmation{{/if}}</h1>
            <p>Thank you for choosing Taskerway</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <p>Hello {{customer_name}},</p>
                {{#if is_contact_form}}
                <p>We've received your inquiry and will get back to you shortly.</p>
                {{else}}
                <p>We've received your booking request for <strong>{{service_type}}</strong> and will get back to you shortly.</p>
                {{/if}}
                <p><strong>Expected Response Time: Within 24 hours</strong></p>
            </div>
            
            {{#if is_contact_form}}
            <div class="section">
                <div class="section-title">Inquiry Details</div>
                <div class="detail-item">
                    <div class="detail-label">Subject:</div>
                    <div class="detail-value">{{subject}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Message:</div>
                    <div class="detail-value">{{description}}</div>
                </div>
            </div>
            {{else}}
            <div class="section">
                <div class="section-title">Booking Details</div>
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Service Type:</div>
                        <div class="detail-value">{{service_type}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Booking Date:</div>
                        <div class="detail-value">{{date}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Preferred Time:</div>
                        <div class="detail-value">{{time}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Contact Phone:</div>
                        <div class="detail-value">{{phone}}</div>
                    </div>
                </div>
            </div>
            
            <!-- Conditional sections based on service type -->
            {{#if is_airport_service}}
            <div class="section">
                <div class="section-title">Airport Transfer Details</div>
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Passenger Count:</div>
                        <div class="detail-value">{{passenger_count}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Pickup Address:</div>
                        <div class="detail-value">{{pickup_address}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Drop-off Address:</div>
                        <div class="detail-value">{{dropoff_address}}</div>
                    </div>
                </div>
            </div>
            {{else}}
            <div class="section">
                <div class="section-title">Service Location</div>
                <div class="detail-item">
                    <div class="detail-label">Service Address:</div>
                    <div class="detail-value">{{address}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Service Description:</div>
                    <div class="detail-value">{{description}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Budget Range:</div>
                    <div class="detail-value">{{budget}}</div>
                </div>
            </div>
            {{/if}}
            {{/if}}
            
            <div class="section">
                <div class="section-title">Next Steps</div>
                <p>Our team will review your {{#if is_contact_form}}inquiry{{else}}request{{/if}} and contact you to {{#if is_contact_form}}provide assistance{{else}}confirm details and pricing{{/if}}. If you have any urgent questions, please don't hesitate to reach out to us directly.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Taskerway Professional Services</p>
            <p>Email: <a href="mailto:support@taskerway.com.au">support@taskerway.com.au</a> | Phone: (02) 1234 5678</p>
            <p>© 2023 Taskerway. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### Step 4: Save and Test the Template

1. Click "Save" to save your template
2. Click the "Test" button
3. Fill in sample data for all variables:
   - `customer_name`: John Smith
   - `service_type`: Airport Pickup
   - `phone`: 123-456-7890
   - `date`: 2023-12-01
   - `time`: 10:00 AM
   - `is_airport_service`: true
   - `passenger_count`: 2
   - `pickup_address`: Sydney Airport
   - `dropoff_address`: 123 Main St
   - `address`: (leave empty for airport service)
   - `description`: (leave empty for airport service)
   - `budget`: (leave empty for airport service)
   - `is_contact_form`: (leave empty for booking emails)
   - `subject`: (leave empty for booking emails)

4. Send the test email to verify it works correctly

## Required Template Variables

Your unified template must include these exact variable names:

### Common Variables (Required for All Emails)
- `{{customer_name}}`
- `{{service_type}}`
- `{{phone}}`
- `{{date}}`
- `{{time}}`

### Conditional Variables (Used Based on Email Type)

#### For Airport Services:
- `{{is_airport_service}}` (should be true)
- `{{passenger_count}}`
- `{{pickup_address}}`
- `{{dropoff_address}}`

#### For Other Services:
- `{{is_airport_service}}` (should be false or empty)
- `{{address}}`
- `{{description}}`
- `{{budget}}`

#### For Contact Forms:
- `{{is_contact_form}}` (should be true)
- `{{subject}}`
- `{{description}}` (used for the message content)

## Updating Your Application Code

The unified email service is already implemented in your application. The changes include:

1. **Single Template ID**: Using `template_uvnmczx` instead of separate template IDs
2. **Unified Parameters**: All email types now send the same set of parameters
3. **Conditional Display**: The template uses conditional logic to show appropriate sections
4. **Contact Form Support**: Added support for contact form submissions

## Testing the Unified Template

1. Visit your website's `/email-test` page
2. Click "Test Connection" first
3. Try "Test Service Email", "Test Airport Email", and "Test Contact Email"
4. Check that emails are sent successfully
5. Verify the received emails display correctly

## Troubleshooting

If you encounter issues:

1. **Check Variable Names**: Ensure all variable names match exactly
2. **Verify Template ID**: Confirm the template ID is `template_uvnmczx`
3. **Test in EmailJS Dashboard**: Use the built-in test feature
4. **Check Browser Console**: Look for detailed error messages
5. **Validate Service Connection**: Ensure your EmailJS service is properly connected

## Benefits Summary

By using a unified template, you'll have:
- Easier maintenance
- Consistent branding
- Reduced configuration complexity
- Simplified troubleshooting
- Better user experience