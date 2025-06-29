# The Bakers' Co. - Component System

This project now uses a JavaScript-based component system to eliminate code duplication and make it easier to create new pages. It also includes a JSON-based menu system for easy content management.

## How It Works

The component system consists of several key files:

- `components.js` - Contains reusable components (navigation, footer, etc.)
- `styles.css` - Contains all shared styles
- `template.html` - A template for creating new pages
- `data/menu.json` - Menu data in JSON format
- `menu-loader.js` - Loads and renders menu data from JSON
- `menu-manager.html` - Web interface for editing menu data

## Local Development

The component system automatically detects your environment:

- **Local Development** (Live Server): Uses relative paths (`breads.html`)
- **GitHub Pages**: Uses repository-based paths (`/the-bakers-co/breads.html`)

### Using Live Server

1. Install the Live Server extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. The navigation will automatically use relative paths for local development
4. All links will work correctly in both local and production environments

### Debugging

To debug the environment detection, include `dev-config.js` in your HTML:

```html
<script src="dev-config.js"></script>
```

This will log environment information to the console when running locally.

## Menu Management

### JSON-Based Menu System

The menu data is now stored in `data/menu.json` and automatically loaded by the menu pages. This makes it easy to:

- Update menu items without touching HTML
- Add new categories and items
- Maintain consistent formatting
- Version control your menu changes

### Using the Menu Manager

1. Open `menu-manager.html` in your browser
2. Click "Load Current Data" to load the existing menu
3. Edit the JSON data in the text area
4. Use "Validate JSON" to check for errors
5. Use "Download JSON" to save your changes
6. Copy the JSON content and update `data/menu.json`

### Menu JSON Structure

```json
{
  "breads": {
    "title": "Breads",
    "categories": [
      {
        "name": "Category Name",
        "description": "Category description",
        "items": [
          {
            "name": "Item Name",
            "price": "₱15",
            "description": "Item description"
          }
        ]
      }
    ]
  },
  "drinks": {
    "title": "Drinks",
    "categories": [
      {
        "name": "Category Name",
        "priceRange": "(₱29 · ₱39 · ₱45)",
        "description": "Category description",
        "items": [
          {
            "name": "Item Name",
            "description": "Item description"
          }
        ]
      }
    ]
  }
}
```

## Creating a New Page

To create a new page, follow these steps:

1. **Copy the template**: Use `template.html` as your starting point
2. **Update the title**: Change the `<title>` tag to your page title
3. **Add your content**: Replace the placeholder content in the `<main>` section
4. **Add page-specific styles** (if needed): Add custom CSS to `styles.css` or include it in the page

### Example: Creating a "Contact" page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Us</title>
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
  <link href="styles.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

<div id="navigation"></div>

<main class="container flex-grow-1 mt-5 pt-4">
  <h2 class="mt-4 mb-3">Contact Us</h2>
  
  <div class="row">
    <div class="col-md-8 mx-auto">
      <p>Get in touch with us...</p>
      <!-- Your contact form or information here -->
    </div>
  </div>
</main>

<div id="footer"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="components.js"></script>
</body>
</html>
```

## Available Components

### Navigation
- **ID**: `navigation`
- **Auto-detects**: Active page and highlights the correct nav link
- **Auto-detects**: Environment (local vs production) and uses appropriate paths
- **Usage**: `<div id="navigation"></div>`

### Footer
- **ID**: `footer`
- **Usage**: `<div id="footer"></div>`

### Menu Content
- **ID**: `menu-content`
- **Auto-loads**: Menu data from JSON
- **Usage**: `<div id="menu-content"></div>`

## Adding New Components

To add a new reusable component:

1. **Register it in `components.js`**:
```javascript
componentLoader.register('myComponent', `
  <div class="my-component">
    <h3>{{title}}</h3>
    <p>{{content}}</p>
  </div>
`);
```

2. **Use it in your HTML**:
```html
<div id="myComponent"></div>
```

3. **Load it with data**:
```javascript
componentLoader.load('myComponent', 'myComponent', {
  title: 'My Title',
  content: 'My content'
});
```

## Environment Detection

The system automatically detects your environment:

| Environment | Hostname | Base Path | Example URLs |
|-------------|----------|-----------|--------------|
| Local Development | `localhost` | `''` | `breads.html` |
| GitHub Pages | `*.github.io` | `/repo-name` | `/the-bakers-co/breads.html` |
| Other Hosting | Any other | `''` | `breads.html` |

## Benefits

- **No more code duplication**: Navigation and footer are defined once
- **Easy maintenance**: Update components in one place
- **Consistent styling**: All pages use the same CSS
- **Automatic active states**: Navigation automatically highlights the current page
- **Environment-aware**: Works with both local development and production
- **JSON-based menus**: Easy to update menu content without touching HTML
- **GitHub Pages compatible**: Works with static hosting

## File Structure

```
the-bakers-co/
├── index.html          # Home page
├── about.html          # About page
├── breads.html         # Breads menu (JSON-powered)
├── drinks.html         # Drinks menu (JSON-powered)
├── menu-manager.html   # Menu editing interface
├── components.js       # Component system
├── menu-loader.js      # Menu data loader
├── styles.css          # Shared styles
├── template.html       # Template for new pages
├── dev-config.js       # Development debugging (optional)
├── data/
│   └── menu.json       # Menu data
├── logo.png           # Logo image
└── favicon.ico        # Favicon
```

## Notes

- The component system automatically detects the current page and sets the correct active state in navigation
- All pages now use the same styling from `styles.css`
- The system is lightweight and doesn't require any build tools
- Works perfectly with GitHub Pages static hosting
- Compatible with Live Server for local development
- Menu data is loaded dynamically from JSON, making updates easy 