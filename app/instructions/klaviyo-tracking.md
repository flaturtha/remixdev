# Klaviyo Tracking Enhancements

## Enhanced Form Events Data
- Device Type (mobile/desktop)
- Browser Type
- UTM Parameters from URL
- Referrer URL
- Form Interaction Time (time between focus and submit)

## User Behavior Events
- Benefits List Viewed (when user scrolls to benefits section)
- Benefits List Interaction (which benefits they hover over)
- Time to First Interaction
- Total Time on Page before form submission
- Mouse Movement Patterns

## Performance Events
- Page Load Time
- Image Load Time
- Form Response Time
- Client-side Errors

## Enhanced Scroll Tracking
- Time to Scroll (how long before reaching each scroll depth)
- Scroll Speed
- Scroll Direction Changes

## Exit Intent Data
- Track when users move towards closing tab
- Track last element interacted with
- Track time spent before exit

## Implementation Notes
- Each event should include standard data:
  - Landing Page Variant
  - Page URL
  - Timestamp
  - Device/Browser Info
  - UTM Parameters
  - Session ID
- Consider rate limiting for high-frequency events
- Ensure GDPR/privacy compliance
- Consider data storage implications 