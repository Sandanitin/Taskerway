# Separate Email Templates Setup

You have two separate EmailJS templates:
1. **Airport Booking Template**: `template_g8sz0t6`
2. **Service Booking Template**: `template_uvnmczx`

Both use the same service: `service_j1it8n7`
Both use the same public key: `h7cnMVE1nufu98OC7`

## Airport Booking Template (template_g8sz0t6)
**Subject**: Airport Booking Confirmation - Taskerway

```html
<!DOCTYPE html>
<html>
<head>
    <title>Airport Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #2563eb; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Airport Booking Confirmation</h1>
        <p>Thank you for choosing Taskerway</p>
    </div>
    
    <div style="padding: 30px; background-color: #f9f9f9;">
        <p>Hello {{customer_name}},</p>
        
        <p>We've received your <strong>Airport {{service_type}}</strong> booking and will contact you within 24 hours.</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Service:</strong> Airport {{service_type}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        
        <h3>Airport Transfer Details:</h3>
        <p><strong>Passenger Count:</strong> {{passenger_count}}</p>
        <p><strong>Pickup Address:</strong> {{pickup_address}}</p>
        <p><strong>Drop-off Address:</strong> {{dropoff_address}}</p>
        
        <p>Our team will confirm your booking and provide driver details shortly.</p>
        <p>If you have any urgent questions, please call us at (02) 1234 5678.</p>
    </div>
    
    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 14px; color: #666;">
        <p>Taskerway Professional Services</p>
        <p>Email: <a href="mailto:support@taskerway.com.au">support@taskerway.com.au</a></p>
        <p>© 2023 Taskerway. All rights reserved.</p>
    </div>
</body>
</html>
```

## Service Booking Template (template_uvnmczx)
**Subject**: Service Booking Confirmation - Taskerway

```html
<!DOCTYPE html>
<html>
<head>
    <title>Service Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #2563eb; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Service Booking Confirmation</h1>
        <p>Thank you for choosing Taskerway</p>
    </div>
    
    <div style="padding: 30px; background-color: #f9f9f9;">
        <p>Hello {{customer_name}},</p>
        
        <p>We've received your <strong>{{service_type}}</strong> booking and will contact you within 24 hours.</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Service:</strong> {{service_type}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        
        <h3>Service Details:</h3>
        <p><strong>Address:</strong> {{address}}</p>
        <p><strong>Description:</strong> {{description}}</p>
        <p><strong>Budget:</strong> {{budget}}</p>
        
        <p>Our team will confirm your booking and provide service details shortly.</p>
        <p>If you have any urgent questions, please call us at (02) 1234 5678.</p>
    </div>
    
    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 14px; color: #666;">
        <p>Taskerway Professional Services</p>
        <p>Email: <a href="mailto:support@taskerway.com.au">support@taskerway.com.au</a></p>
        <p>© 2023 Taskerway. All rights reserved.</p>
    </div>
</body>
</html>
```

## Setup Instructions

### For Airport Template (template_g8sz0t6):
1. Log in to https://www.emailjs.com/
2. Go to "Email Templates"
3. Create new template or edit existing with ID: `template_g8sz0t6`
4. Set subject to: `Airport Booking Confirmation - Taskerway`
5. Replace template content with the Airport Booking Template HTML above
6. Save

### For Service Template (template_uvnmczx):
1. Log in to https://www.emailjs.com/
2. Go to "Email Templates"
3. Create new template or edit existing with ID: `template_uvnmczx`
4. Set subject to: `Service Booking Confirmation - Taskerway`
5. Replace template content with the Service Booking Template HTML above
6. Save

## Test Both Templates

### Test Airport Template:
- `customer_name`: Test User
- `service_type`: Pickup
- `date`: 2023-12-01
- `time`: 10:00 AM
- `phone`: 123-456-7890
- `passenger_count`: 2
- `pickup_address`: Sydney Airport
- `dropoff_address`: 123 Main Street

### Test Service Template:
- `customer_name`: Test User
- `service_type`: Plumbing Service
- `date`: 2023-12-01
- `time`: 10:00 AM
- `phone`: 123-456-7890
- `address`: 123 Main Street
- `description`: Bathroom plumbing repair
- `budget`: $200-300

This setup completely separates Airport and Service bookings into their own templates, eliminating any possibility of variable corruption between the two types.