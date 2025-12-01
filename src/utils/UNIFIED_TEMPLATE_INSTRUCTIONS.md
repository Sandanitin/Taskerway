# Unified Email Template Instructions

I have consolidated your email service to use a **single unified template** for all email types (Airport, Service, and Contact Form). This simplifies your setup and prevents errors.

## 1. Update EmailJS Template

1.  Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates).
2.  Open your template with ID: `template_uvnmczx` (or create a new one and update the ID in `src/utils/emailService.js`).
3.  **Subject Line:**
    ```
    {{#if is_contact_form}}Contact Form Submission{{else}}{{service_type}} Booking Confirmation{{/if}} - Taskerway
    ```
4.  **Content:**
    Copy the entire content of the file `UNIFIED_EMAIL_TEMPLATE.html` (located in your project root) and paste it into the HTML editor of your EmailJS template.
5.  **Save** the template.

## 2. Test the Email Service

1.  Ensure your development server is running (`npm run dev`).
2.  Navigate to `http://localhost:5173/email-test`.
3.  Click **Test Connection** to verify your Public Key and Service ID.
4.  Click **Test Service Email**, **Test Airport Email**, and **Test Contact Email**.
5.  Check your email inbox (the one associated with the `to_email` or your EmailJS account) to see if the emails arrived and look correct.

## 3. Troubleshooting

*   **"EmailJS not configured properly"**: This means the Service ID in `src/utils/emailService.js` (`service_j1it8n7`) does not match the one in your EmailJS dashboard, or the Public Key is incorrect.
*   **Template issues**: If the email arrives but looks broken, ensure you copied the HTML correctly and that "Auto-Escape" is disabled for the HTML content if that's an option (usually EmailJS handles Handlebars syntax automatically).

## Key Changes Made

*   Updated `src/utils/emailService.js` to use a single `sendUnifiedBookingEmail` function logic.
*   Exported `sendAirportBookingEmail`, `sendServiceBookingEmail`, and `sendContactFormEmail` as wrappers around the unified function, ensuring backward compatibility with your existing components.
*   Added logic to handle `is_contact_form` to differentiate between bookings and contact inquiries in the same template.
