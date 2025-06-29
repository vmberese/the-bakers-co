// Component loader for The Bakers’ Co.
class ComponentLoader {
  constructor() {
    this.components = {};
    this.basePath = this.detectBasePath();
  }

  // Detect if we're running locally or on GitHub Pages
  detectBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // If running on localhost (Live Server), use relative paths
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '';
    }
    
    // If running on GitHub Pages, use the repository name as base path
    if (hostname.includes('github.io')) {
      // Extract repo name from pathname (e.g., /the-bakers-co/ -> /the-bakers-co)
      const pathParts = pathname.split('/').filter(part => part);
      if (pathParts.length > 0) {
        return `/${pathParts[0]}`;
      }
    }
    
    // Fallback to empty string for other hosting scenarios
    return '';
  }

  // Register a component
  register(name, template) {
    this.components[name] = template;
  }

  // Load a component into an element
  load(name, targetId, data = {}) {
    const target = document.getElementById(targetId);
    if (!target) {
      console.error(`Target element with id '${targetId}' not found`);
      return;
    }

    let template = this.components[name];
    if (!template) {
      console.error(`Component '${name}' not found`);
      return;
    }

    // Replace placeholders with data
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      template = template.replace(new RegExp(placeholder, 'g'), data[key]);
    });

    // Replace base path placeholders
    template = template.replace(/\{\{basePath\}\}/g, this.basePath);

    target.innerHTML = template;
  }
}

// Initialize the component loader
const componentLoader = new ComponentLoader();

// Register components
componentLoader.register('navigation', `
<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center gap-2" href="{{basePath}}/">
      <img src="logo.png" alt="The Bakers’ Co. Logo" width="60" height="60" class="d-inline-block align-text-top">
      The Bakers’ Co.
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav ms-auto">
        <a class="nav-link {{breadsActive}}" href="{{basePath}}/breads.html">Breads</a>
        <a class="nav-link {{drinksActive}}" href="{{basePath}}/drinks.html">Drinks</a>
        <a class="nav-link {{aboutActive}}" href="{{basePath}}/about.html">About Us</a>
      </div>
    </div>
  </div>
</nav>
`);

componentLoader.register('footer', `
<footer class="text-center py-3 mt-auto text-muted border-top bg-white" style="font-size: 0.9rem;">
  &copy; The Bakers’ Co. 2025
</footer>
`);

componentLoader.register('head', `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{title}}</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
<style>
  body {
    font-family: 'Montserrat', Futura, sans-serif;
  }
  {{customStyles}}
</style>
`);

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load navigation with active state
  const currentPage = window.location.pathname;
  const navData = {
    breadsActive: currentPage.includes('/breads') ? 'active' : '',
    drinksActive: currentPage.includes('/drinks') ? 'active' : '',
    aboutActive: currentPage.includes('/about') ? 'active' : ''
  };
  
  componentLoader.load('navigation', 'navigation', navData);
  componentLoader.load('footer', 'footer');
}); 