/**
 * Utility function to navigate with view transitions
 * This is used to enable smooth transitions between pages
 */
export function navigateWithViewTransition(
  navigate: (to: string) => void,
  to: string
) {
  // Check if the View Transitions API is supported
  if (document.startViewTransition) {
    // Use the View Transitions API
    document.startViewTransition(() => {
      navigate(to);
    });
  } else {
    // Fallback for browsers that don't support the View Transitions API
    navigate(to);
  }
} 