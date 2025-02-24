// This script handles dark mode functionality
(function() {
  // Initialize dark mode based on preference
  function initDarkMode() {
    try {
      var darkMode = localStorage.getItem('darkMode');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (darkMode === 'dark' || (prefersDark && !darkMode)) {
        document.documentElement.classList.add('dark');
        console.log('Dark mode initialized: ON');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Dark mode initialized: OFF');
      }
    } catch (e) {
      console.error('Error initializing dark mode:', e);
    }
  }
  
  // Toggle dark mode
  window.toggleDarkMode = function() {
    try {
      var html = document.documentElement;
      var isDark = html.classList.contains('dark');
      
      if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
        console.log('Toggled to light mode');
      } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
        console.log('Toggled to dark mode');
      }
    } catch (e) {
      console.error('Error toggling dark mode:', e);
    }
  };
  
  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }
})(); 