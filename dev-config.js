// Development configuration and debugging helpers
// This file is optional and can be removed in production

// Add this to any page to debug the environment detection
function debugEnvironment() {
  console.log('=== Environment Debug Info ===');
  console.log('Hostname:', window.location.hostname);
  console.log('Pathname:', window.location.pathname);
  console.log('Full URL:', window.location.href);
  console.log('Protocol:', window.location.protocol);
  console.log('Port:', window.location.port);
  
  // Test the component loader's base path detection
  if (typeof componentLoader !== 'undefined') {
    console.log('Detected Base Path:', componentLoader.basePath);
    console.log('Is Local Development:', componentLoader.basePath === '');
  }
  console.log('=============================');
}

// Auto-run debug info in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Only show debug info in development
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(debugEnvironment, 1000); // Wait for component loader to initialize
  });
} 