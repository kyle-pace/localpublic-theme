# Sections Documentation - Local Public Ghost Theme

This documentation explains how sections work in the Local Public Ghost theme and how to manage content through the Ghost CMS admin panel.

## Table of Contents

- [Overview](#overview)
- [Section Types](#section-types)
- [Tag-Based Sections](#tag-based-sections)
  - [Section Logos](#section-logos)
  - [Section User Experience](#section-user-experience)
- [Custom Field Sections](#custom-field-sections)
  - [Hero Section](#hero-section)
- [Static Sections](#static-sections)
- [How to Edit Content](#how-to-edit-content)
- [Best Practices](#best-practices)

---

## Overview

The home page (`home.hbs`) is composed of multiple sections that can be customized through Ghost CMS. Each section uses different methods to pull content:

1. **Tag-Based Sections**: Content is managed through Ghost Pages with specific tags
2. **Custom Field Sections**: Content is managed through Ghost Custom Settings
3. **Static Sections**: Content is hardcoded in the template files

---

## Section Types

### Tag-Based Sections

These sections use Ghost's `{{#get}}` helper to fetch pages with specific tags. The content from these pages is then displayed in the section.

**How it works:**
- Create a Ghost Page with a specific tag
- The section automatically fetches and displays the page content
- Content can include HTML, images, and other rich media

### Custom Field Sections

These sections use Ghost Custom Settings (defined in `package.json`) to store and display content.

**How it works:**
- Custom fields are defined in the theme's `package.json` file
- Values are set in Ghost Admin → Settings → General → Custom Settings
- The theme displays these values using `{{@custom.field_name}}`

### Static Sections

These sections have hardcoded content in the template files. To change them, you need to edit the `.hbs` files directly.

---

## Tag-Based Sections

### Section Logos

**Location:** `partials/section-logos.hbs`

**Purpose:** Displays PBS station logos in a carousel/slider format.

**How it works:**
- Fetches pages tagged with `#pbs-stations` (or `hash-pbs-stations`)
- Displays the content of the first matching page
- Content is rendered inside a Swiper carousel component

**To edit the logos:**

1. **Create or Edit a Page:**
   - Go to Ghost Admin → Pages
   - Create a new page or edit an existing one
   - Add the tag `#pbs-stations` (or `hash-pbs-stations`) to the page

2. **Add Logo Content:**
   - In the page editor, add your logo HTML/images
   - You can use HTML directly in the Ghost editor (switch to HTML mode)
   - Example structure:
     ```html
     <div class="logo-item">
       <img src="path-to-logo.png" alt="Station Name">
     </div>
     <div class="logo-item">
       <img src="path-to-logo2.png" alt="Station Name 2">
     </div>
     <!-- Add more logos as needed -->
     ```

3. **Publish the Page:**
   - Make sure the page is published (not draft)
   - The section will automatically update to show the new content

**Important Notes:**
- Only the first page with the `#pbs-stations` tag will be used
- The content is displayed in a Swiper carousel, so structure your HTML accordingly
- The section uses the class `swiper-pbs-stations` for JavaScript initialization

---

### Section User Experience

**Location:** `partials/section-user-experience.hbs`

**Purpose:** Displays user experience examples, screenshots, or testimonials in a carousel format.

**How it works:**
- Fetches pages tagged with `#user-experience` (or `hash-user-experience`)
- Displays the content of the first matching page
- Content is rendered inside a Swiper carousel component
- Has a fixed heading: "A Refined User Experience"
- Has a fixed description: "Each platform is thoughtfully designed to elevate the user experience, highlighting station branding, intuitive design, and accessibility for all."

**To edit the user experience content:**

1. **Create or Edit a Page:**
   - Go to Ghost Admin → Pages
   - Create a new page or edit an existing one
   - Add the tag `#user-experience` (or `hash-user-experience`) to the page

2. **Add Content:**
   - In the page editor, add your content (screenshots, descriptions, etc.)
   - You can use HTML directly in the Ghost editor
   - Example structure:
     ```html
     <div class="experience-item">
       <img src="screenshot1.png" alt="Platform Screenshot">
       <h3>Platform Name</h3>
       <p>Description of the user experience</p>
     </div>
     <div class="experience-item">
       <img src="screenshot2.png" alt="Platform Screenshot 2">
       <h3>Platform Name 2</h3>
       <p>Description of the user experience</p>
     </div>
     <!-- Add more items as needed -->
     ```

3. **Publish the Page:**
   - Make sure the page is published (not draft)
   - The section will automatically update to show the new content

**Important Notes:**
- Only the first page with the `#user-experience` tag will be used
- The heading and description text are hardcoded in the template
- The section uses the class `swiper-user-experience` for JavaScript initialization

---

## Custom Field Sections

### Hero Section

**Location:** `partials/section-hero.hbs`

**Purpose:** The main hero/banner section at the top of the homepage.

**Custom Fields Used:**
- `hero_title` - Main heading text
- `hero_description` - Subheading/description text
- `hero_button_text` - Primary button text
- `hero_button_url` - Primary button link URL

**To edit the hero section:**

1. **Go to Ghost Admin:**
   - Navigate to Settings → General
   - Scroll down to "Custom Settings" section

2. **Edit the Fields:**
   - **Hero Title**: Enter your main headline
   - **Hero Description**: Enter your description text
   - **Hero Button Text**: Enter the button label (e.g., "Book a demo")
   - **Hero Button URL**: Enter the button link (e.g., "#contact" or "https://example.com")

3. **Save Changes:**
   - Click "Save" at the bottom of the settings page
   - The hero section will update immediately

**Default Values:**
- Hero Title: "Public Media Streaming Made Simple"
- Hero Description: "Local Public empowers stations to collaborate, curate, and deliver their on-demand and live content everywhere it matters."
- Hero Button Text: "Book a demo"
- Hero Button URL: "#contact"

---

## Static Sections

These sections have hardcoded content that cannot be changed through the Ghost admin panel. To modify them, you need to edit the template files directly.

**Static Sections:**
- `section-curve` - Decorative curve element
- `section-onboarding` - "Fast Onboarding" section with statistics
- `section-stations` - "Built by Stations" feature cards
- `section-cms` - CMS features section
- `section-network` - Network section
- `section-platform` - Platform section
- `section-latest-updates` - Latest updates/blog posts section

**To edit static sections:**
1. Locate the corresponding `.hbs` file in the `partials/` directory
2. Edit the HTML/content directly
3. Rebuild the theme if necessary

---

## How to Edit Content

### Method 1: Using Ghost Admin (Tag-Based Sections)

1. **Log into Ghost Admin**
2. **Navigate to Pages**
3. **Find or Create the Page:**
   - For logos: Look for a page with tag `#pbs-stations`
   - For user experience: Look for a page with tag `#user-experience`
   - If no page exists, create a new one

4. **Add the Required Tag:**
   - In the page settings, add the appropriate tag
   - Tags should be: `#pbs-stations` or `#user-experience`

5. **Edit Content:**
   - Use the Ghost editor to add your content
   - Switch to HTML mode if you need to add custom HTML
   - You can include images, text, and other media

6. **Publish:**
   - Make sure the page status is "Published" (not "Draft")
   - The section will automatically update

### Method 2: Using Custom Settings (Hero Section)

1. **Log into Ghost Admin**
2. **Navigate to Settings → General**
3. **Scroll to "Custom Settings"**
4. **Edit the hero fields:**
   - `hero_title`
   - `hero_description`
   - `hero_button_text`
   - `hero_button_url`
5. **Click "Save"**

### Method 3: Editing Template Files (Static Sections)

1. **Locate the template file** in `partials/` directory
2. **Edit the content** directly in the `.hbs` file
3. **Save the file**
4. **Rebuild the theme** if using a build process

---

## Best Practices

### For Tag-Based Sections:

1. **Use Descriptive Tags:**
   - Always use the exact tag format: `#pbs-stations` or `#user-experience`
   - Tags are case-sensitive

2. **Content Structure:**
   - Structure your HTML to work well in a carousel
   - Use consistent classes for styling
   - Test on mobile devices

3. **Image Optimization:**
   - Optimize images before uploading
   - Use appropriate image sizes
   - Include alt text for accessibility

4. **Single Source:**
   - Only one page per tag will be used
   - If you have multiple pages with the same tag, only the first one will be displayed
   - Consider using a single page and organizing content within it

### For Custom Fields:

1. **Keep Text Concise:**
   - Hero titles should be short and impactful
   - Descriptions should be clear and engaging

2. **Test Links:**
   - Always test button URLs before publishing
   - Use relative paths for internal links (e.g., `#contact`)
   - Use full URLs for external links (e.g., `https://example.com`)

### General:

1. **Preview Changes:**
   - Always preview your changes before publishing
   - Check both desktop and mobile views

2. **Backup Content:**
   - Keep backups of important content
   - Document any custom HTML structures you use

3. **Performance:**
   - Optimize images and media
   - Keep content focused and relevant

---

## Troubleshooting

### Section Not Showing Content

**Problem:** Tag-based section is empty or not displaying content.

**Solutions:**
- Verify the page has the correct tag (`#pbs-stations` or `#user-experience`)
- Ensure the page is published (not in draft status)
- Check that the page has content in the editor
- Clear Ghost cache if applicable

### Custom Fields Not Appearing

**Problem:** Hero section shows default values or empty fields.

**Solutions:**
- Go to Settings → General → Custom Settings
- Verify the fields are saved correctly
- Check that field names match exactly (case-sensitive)
- Clear browser cache

### Carousel Not Working

**Problem:** Swiper carousel is not functioning properly.

**Solutions:**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify Swiper library is loaded
- Check that content structure matches expected format

---

## Technical Details

### Tag-Based Section Implementation

```handlebars
{{#get "pages" limit="1" filter="tag:hash-pbs-stations"}}
    {{#foreach pages}}
        <div class="swiper-slide-temp">
            {{content}}
        </div>
    {{/foreach}}
{{/get}}
```

This code:
- Uses Ghost's `{{#get}}` helper to query pages
- Filters by tag using `filter="tag:hash-pbs-stations"`
- Limits results to 1 page
- Loops through results and displays the page content

### Custom Field Implementation

```handlebars
{{@custom.hero_title}}
```

This code:
- Accesses custom settings defined in `package.json`
- Uses the `@custom` global object
- References the field name directly

---

## Additional Resources

- [Ghost Handlebars Helpers Documentation](https://ghost.org/docs/themes/helpers/)
- [Ghost Custom Settings Documentation](https://ghost.org/docs/themes/helpers/custom/)
- [Ghost Pages Documentation](https://ghost.org/docs/content/pages/)
- [Ghost Tags Documentation](https://ghost.org/docs/content/tags/)

---

## Support

For theme-specific issues or questions, please refer to the theme repository or contact the theme developers.

