# EmailJS Template Setup - SIMPLIFIED VERSION

## Issue Fixed: "One or more dynamic variables are corrupted"

EmailJS doesn't support complex Handlebars conditionals like `{{#if}}...{{else}}...{{/if}}`. I've created a simplified template that works with all EmailJS versions.

## Setup Instructions

### Step 1: Go to EmailJS Dashboard
1. Visit [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Find or create template with ID: `template_uvnmczx`

### Step 2: Set the Subject Line
Use a simple subject line without conditionals:
```
{{service_type}} - Taskerway Booking Confirmation
```

### Step 3: Copy the Template HTML
1. Open the file: `SIMPLIFIED_EMAIL_TEMPLATE.html`
2. Copy the **entire HTML content**
3. Paste it into the EmailJS template's "Content" field
4. Click **Save**

### Step 4: Test the Template
1. In EmailJS dashboard, click the **"Test it"** button on your template
2. Fill in these test values:
   - `customer_name`: John Doe
   - `service_type`: Airport Pickup
   - `to_email`: your-email@example.com
   - `phone`: 0458717810
   - `date`: 2024-12-15
   - `time`: 10:00 AM
   - `passenger_count`: 2
   - `pickup_address`: Sydney Airport
   - `dropoff_address`: 123 Main St, Sydney
   - `address`: (leave empty)
   - `description`: (leave empty)
   - `budget`: (leave empty)
   - `subject`: (leave empty)
3. Click **Send Test**
4. Check your email inbox

### Step 5: Verify on Your Website
1. Go to `http://localhost:3000/email-test`
2. Click **"Test Service Email"**
3. Check the console - you should see the email was sent via EmailJS (not mock)
4. Check your inbox for the confirmation email

## How This Template Works

The simplified template shows **all** fields in every email. Empty fields will just show as blank, which is fine:

- **For Airport Bookings**: Shows passenger_count, pickup_address, dropoff_address (other fields empty)
- **For Service Bookings**: Shows address, description, budget (other fields empty)
- **For Contact Forms**: Shows subject, description (other fields empty)

All emails will show the common fields: customer_name, service_type, phone, date, time.

## Expected Variables

Your code sends all these variables (some may be empty depending on the type):

**Common (always present):**
- `customer_name` - Customer's full name
- `service_type` - Type of service requested
- `to_email` - Customer's email address
- `phone` - Customer's phone number
- `date` - Booking date
- `time` - Booking time
- `reply_to` - Your support email

**Airport-specific (empty for non-airport services):**
- `passenger_count` - Number of passengers
- `pickup_address` - Pickup location
- `dropoff_address` - Dropoff location

**Service-specific (empty for airport services):**
- `address` - Service location
- `description` - Service description
- `budget` - Budget range

**Contact form-specific (empty for bookings):**
- `subject` - Inquiry subject
- `description` - Message content (also used in service bookings)

## Troubleshooting

### If you still get "corrupted variables" error:

1. **Check for typos**: Variable names must match exactly (case-sensitive)
2. **Remove all conditionals**: Make sure there are no `{{#if}}` statements
3. **Use basic syntax only**: Only use `{{variable_name}}` format
4. **Save and refresh**: After editing, save the template and refresh the page

### If emails aren't sending:

1. Verify your Service ID: `service_j1it8n7` is active
2. Check your EmailJS email service is connected
3. Verify you haven't exceeded EmailJS rate limits (200 emails/month on free tier)
4. Check browser console for error messages

## Ready to Go!

Once you've updated the template in EmailJS with this simplified version, your emails will start sending immediately. No code changes needed - everything is already configured correctly in your `emailService.js`.
