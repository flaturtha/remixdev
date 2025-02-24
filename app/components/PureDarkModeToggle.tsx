export default function PureDarkModeToggle() {
  return (
    <>
      <button
        id="darkModeToggle"
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        aria-label="Toggle dark mode"
        dangerouslySetInnerHTML={{
          __html: `
            <svg id="moonIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:hidden">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
            <svg id="sunIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden dark:block">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          `
        }}
        onClick={() => {
          if (typeof window !== "undefined") {
            window.toggleDarkMode();
          }
        }}
      />
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('darkModeToggle').addEventListener('click', function() {
            var html = document.documentElement;
            var isDark = html.classList.contains('dark');
            
            if (isDark) {
              html.classList.remove('dark');
              localStorage.setItem('darkMode', 'light');
            } else {
              html.classList.add('dark');
              localStorage.setItem('darkMode', 'dark');
            }
          });
        `
      }} />
    </>
  );
} 