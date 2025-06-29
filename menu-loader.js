// Menu loader for The Bakers' Co.
class MenuLoader {
  constructor() {
    this.menuData = null;
  }

  // Load menu data from JSON file
  async loadMenuData() {
    try {
      const response = await fetch('data/menu.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.menuData = await response.json();
      return this.menuData;
    } catch (error) {
      console.error('Error loading menu data:', error);
      return null;
    }
  }

  // Render breads menu
  renderBreadsMenu(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.menuData) return;

    const breadsData = this.menuData.breads;
    let html = `<h2 class="mt-4 mb-3">${breadsData.title}</h2>`;

    breadsData.categories.forEach(category => {
      html += `
        <div class="category-section mt-4">
          <div class="category-header">
            ${category.name}
          </div>
          <div class="category-desc">${category.description}</div>

          <div>
      `;

      category.items.forEach(item => {
        html += `
          <div class="item-card">
            <div class="item-title-row">
              <div class="item-title">${item.name}</div>
              <div class="item-price">${item.price}</div>
            </div>
            <div class="text-muted small">${item.description}</div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    // Remove centering classes and set proper styling for menu content
    container.className = 'mt-5 pt-4';
    container.style.minHeight = 'auto';
    container.innerHTML = html;
  }

  // Render drinks menu
  renderDrinksMenu(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.menuData) return;

    const drinksData = this.menuData.drinks;
    let html = `<h2 class="mt-4 mb-3">${drinksData.title}</h2>`;

    drinksData.categories.forEach(category => {
      html += `
        <div class="category-section mt-4">
          <div class="category-header">
            ${category.name} ${category.priceRange ? `<span class="category-price">${category.priceRange}</span>` : ''}
          </div>
          <div class="category-desc">${category.description}</div>

          <div>
      `;

      category.items.forEach(item => {
        html += `
          <div class="item-card">
            <div class="item-title">${item.name}</div>
            <div class="text-muted small">${item.description}</div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    // Remove centering classes and set proper styling for menu content
    container.className = 'mt-5 pt-4';
    container.style.minHeight = 'auto';
    container.innerHTML = html;
  }

  // Initialize menu page
  async initMenuPage(menuType, containerId) {
    await this.loadMenuData();
    
    if (menuType === 'breads') {
      this.renderBreadsMenu(containerId);
    } else if (menuType === 'drinks') {
      this.renderDrinksMenu(containerId);
    }
  }
}

// Initialize the menu loader
const menuLoader = new MenuLoader();

// Auto-initialize menu pages when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('/breads') || currentPage.includes('breads.html')) {
    menuLoader.initMenuPage('breads', 'menu-content');
  } else if (currentPage.includes('/drinks') || currentPage.includes('drinks.html')) {
    menuLoader.initMenuPage('drinks', 'menu-content');
  }
}); 