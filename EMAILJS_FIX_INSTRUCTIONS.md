# EmailJS Fix Instructions

Follow these steps to fix the "Template: One or more dynamic variables are corrupted" error:

## Step 1: Access Your EmailJS Template

1. Go to https://www.emailjs.com/ and log in to your account
2. Click on "Email Templates" in the left sidebar
3. Find and click on your template with ID: `template_uvnmczx`
4. Click the "Edit" button

## Step 2: Replace Template Content

1. Select all existing content in the template editor (Ctrl+A or Cmd+A)
2. Delete all content
3. Copy the entire template from the file `CORRECTED_EMAILJS_TEMPLATE.html`
4. Paste it into the EmailJS template editor

## Step 3: Update Template Subject

1. In the "Subject" field, enter:
   ```
   Taskerway {{service_type}} Confirmation
   ```

## Step 4: Save and Test

1. Click "Save" at the top of the template editor
2. Click "Test" to test your template
3. Fill in the test data exactly as shown below:

**Test Data for Airport Booking:**
- `to_email`: test@example.com
- `customer_name`: Test User
- `service_type`: Airport Pickup
- `phone`: 123-456-7890
- `date`: 2023-12-01
- `time`: 10:00 AM
- `is_airport_service`: true
- `passenger_count`: 2
- `pickup_address`: Sydney Airport
- `dropoff_address`: 123 Main Street
- `address`: 
- `description`: 
- `budget`: 
- `is_contact_form`: 
- `subject`: 

4. Click "Send Test Email"

## Step 5: Verify the Fix

1. Check your email inbox for the test email
2. Verify that the email displays correctly with all information
3. If you receive the email without errors, the fix is successful

## Common Issues and Solutions

### Issue: "Corrupted variables" error persists
**Solution:** 
- Make sure you're using `{{variable_name}}Content{{/variable_name}}` format, NOT `{{#if variable_name}}Content{{/if}}`
- Ensure all variable names are simple (no spaces or special characters)
- Check that all opening `{{variable}}` tags have matching closing `{{/variable}}` tags

### Issue: Conditional sections not showing
**Solution:**
- For conditional sections to appear, the variable must have a value of "true"
- For conditional sections to be hidden, the variable must be empty ("")
- Check that your code is sending the correct values ("true" or "")

### Issue: Missing information in emails
**Solution:**
- Verify that all variable names in your template exactly match those sent by your code
- Check browser console for any error messages
- Ensure all values are being sent as strings

## EmailJS-Compatible Conditional Syntax

**Correct Format:**
```html
{{variable_name}}
Content that shows when variable_name has a value
{{/variable_name}}
```

**Incorrect Format (causes corruption):**
```html
{{#if variable_name}}
Content that shows when variable_name is true
{{/if}}
```

## Required Variables

Make sure your template includes these exact variable names:

### Common Variables (Always Required)
- `{{customer_name}}`
- `{{service_type}}`
- `{{phone}}`
- `{{date}}`
- `{{time}}`

### Conditional Variables
- `{{is_airport_service}}` - Set to "true" for airport bookings
- `{{is_contact_form}}` - Set to "true" for contact form submissions
- `{{address}}` - Service address (conditional)
- `{{description}}` - Service/Inquiry description (conditional)
- `{{subject}}` - Contact form subject (conditional)

## Testing Different Email Types

### For Service Bookings:
- Set `is_airport_service` to "" (empty)
- Set `is_contact_form` to "" (empty)
- Fill `address`, `description`, `budget` with values

### For Airport Bookings:
- Set `is_airport_service` to "true"
- Set `is_contact_form` to "" (empty)
- Fill `passenger_count`, `pickup_address`, `dropoff_address` with values

### For Contact Forms:
- Set `is_airport_service` to "" (empty)
- Set `is_contact_form` to "true"
- Fill `subject`, `description` with values

After completing these steps, your EmailJS template should work correctly without the "corrupted variables" error.