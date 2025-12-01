# Separate Email Functionality for Airport and Other Services

This guide explains how to implement separate email handling for Airport Pick/Drop services and other services while using a single EmailJS template.

## How It Works

The system uses a single template but sends different sets of variables based on the service type:

1. **Airport Services** (contains "airport", "pick", or "drop"):
   - Sends: passenger_count, pickup_address, dropoff_address
   - Leaves empty: address, description, budget

2. **Other Services** (everything else):
   - Sends: address, description, budget
   - Leaves empty: passenger_count, pickup_address, dropoff_address

## Template Conditional Logic

The universal template uses EmailJS's conditional display feature:

```html
<!-- Airport Service Details (shows when passenger_count has value) -->
{{passenger_count}}
<h3>Airport Transfer Details:</h3>
<p><strong>Passenger Count:</strong> {{passenger_count}}</p>
<p><strong>Pickup Address:</strong> {{pickup_address}}</p>
<p><strong>Drop-off Address:</strong> {{dropoff_address}}</p>
{{/passenger_count}}

<!-- Other Service Details (shows when address has value) -->
{{address}}
<h3>Service Details:</h3>
<p><strong>Address:</strong> {{address}}</p>
<p><strong>Description:</strong> {{description}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
{{/address}}
```

## Implementation Steps

### 1. Update Your EmailJS Template

1. Log in to https://www.emailjs.com/
2. Go to "Email Templates"
3. Find and edit your template with ID: `template_uvnmczx`
4. Replace the entire content with the code from `UNIVERSAL_TEMPLATE.html`
5. Set the subject to: `Taskerway {{service_type}} Confirmation`
6. Click "Save"

### 2. Test Airport Service Email

1. Click "Test" button
2. Fill in test data for an airport service:
   - `to_email`: test@example.com
   - `customer_name`: Test User
   - `service_type`: Airport Pickup
   - `phone`: 123-456-7890
   - `date`: 2023-12-01
   - `time`: 10:00 AM
   - `passenger_count`: 2
   - `pickup_address`: Sydney Airport
   - `dropoff_address`: 123 Main Street
   - `address`: (leave empty)
   - `description`: (leave empty)
   - `budget`: (leave empty)
3. Click "Send Test Email"

### 3. Test Other Service Email

1. Click "Test" button
2. Fill in test data for a regular service:
   - `to_email`: test@example.com
   - `customer_name`: Test User
   - `service_type`: Plumbing Service
   - `phone`: 123-456-7890
   - `date`: 2023-12-01
   - `time`: 10:00 AM
   - `passenger_count`: (leave empty)
   - `pickup_address`: (leave empty)
   - `dropoff_address`: (leave empty)
   - `address`: 123 Main Street
   - `description`: Bathroom plumbing repair
   - `budget`: $200-300
3. Click "Send Test Email"

## Code Implementation

The email service automatically determines the service type and sends the appropriate variables:

```javascript
const isAirport = isAirportService(bookingData.serviceType);

if (isAirport) {
  // Send airport-specific fields
  emailParams.passenger_count = String(bookingData.passengerCount || '1');
  emailParams.pickup_address = bookingData.pickupAddress || 'Not specified';
  emailParams.dropoff_address = bookingData.dropoffAddress || 'Not specified';
  // Clear other service fields
  emailParams.address = '';
  emailParams.description = '';
  emailParams.budget = '';
} else {
  // Send service-specific fields
  emailParams.address = bookingData.address || 'Not specified';
  emailParams.description = bookingData.description || 'No description provided';
  emailParams.budget = bookingData.budget || 'Not specified';
  // Clear airport fields
  emailParams.passenger_count = '';
  emailParams.pickup_address = '';
  emailParams.dropoff_address = '';
}
```

## Benefits of This Approach

1. **Single Template**: Easier to maintain than multiple templates
2. **Automatic Detection**: Code automatically determines service type
3. **Conditional Display**: Template shows only relevant sections
4. **No Corrupted Variables**: Empty fields don't cause corruption
5. **Scalable**: Easy to add new service types

## Troubleshooting

### If Airport Section Doesn't Show
- Ensure `passenger_count` has a value (not empty)
- Check that service type contains "airport", "pick", or "drop"

### If Service Section Doesn't Show
- Ensure `address` has a value (not empty)
- Check that service type doesn't contain "airport", "pick", or "drop"

### If Both Sections Show
- Check that only one set of fields has values
- Ensure the other set is completely empty

This approach provides separate functionality while using a single, clean template that avoids the "corrupted variables" error.