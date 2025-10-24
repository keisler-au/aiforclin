# Page Header Standardization

## Overview
All page headers have been standardized to use a consistent, semantic HTML structure with clear BEM naming conventions.

---

## New Page Header System

### Structure

```html
<!-- Single Column (Text Only) -->
<header class="page-header page-header--single">
  <div class="page-header__content">
    <h1>Page Title</h1>
    <p>Optional subtitle or description</p>
    <!-- Optional: buttons, links, etc -->
  </div>
</header>

<!-- Two Column (Text + Image/Icons) -->
<header class="page-header page-header--two-col">
  <div class="page-header__content">
    <h1>Page Title</h1>
    <p>Optional subtitle or description</p>
    <!-- Optional: buttons, links, etc -->
  </div>
  <div class="page-header__media">
    <img src="..." alt="...">
    <!-- OR icons, symbols, etc -->
  </div>
</header>
```

---

## Class Reference

### Base Classes

**`.page-header`** - Base container for all page headers
- Handles padding, max-width, flexbox layout
- Centers content
- Responsive by default

### Modifiers (BEM Style)

**`.page-header--single`** - Single column layout (text only)
- Flex direction: column
- Text alignment: center
- Use for: FAQ, Calculator, Standards, Contact, Comparisons

**`.page-header--two-col`** - Two column layout (text + media)
- Flex direction: row (wraps on mobile)
- Use for: Main page, Compliance, Provisional Psychologists, Beta Apps

### Elements (BEM Style)

**`.page-header__content`** - Content container
- Contains heading, subtitle, buttons
- Flexible width (flex: 1)
- Text centered

**`.page-header__media`** - Media container
- Contains images, icons, symbols
- Fixed width (flex: 0 0 auto)
- Centered alignment

---

## Pages Updated

### Single Column Headers
1. ✅ **calculator/index.html** - AI Scribe Calculator
2. ✅ **standards/index.html** - AI Ethical Standards
3. ✅ **faq/index.html** - Frequently Asked Questions
4. ✅ **contact/index.html** - Get In Touch
5. ✅ **comparisons/index.html** - AI Scribe Company Comparisons

### Two Column Headers
1. ✅ **index.html** - Main landing page (text + headshot image)
2. ✅ **compliance/index.html** - AI Compliance Pack (text + symbols grid)
3. ✅ **provisional-psychologists/index.html** - Free AI Scribes (text + header image)
4. ✅ **beta-apps/index.html** - Beta Apps (text only, but uses two-col structure)

---

## Removed Redundant Classes

### Deprecated Classes (Legacy Support Maintained)
- `.title-container` - Replaced by `.page-header`
- `.title-content` - Replaced by `.page-header__content`
- `.title-content-centered` - Replaced by `.page-header__content`
- `.header` - Replaced by `.page-header__content`
- `.main-title` - Now use `<h1>` directly in `.page-header`
- `.main-subtitle` - Now use `<p>` directly in `.page-header`

**Note:** Legacy classes are still in CSS for backwards compatibility but marked as deprecated.

---

## Responsive Behavior

### Mobile (≤768px)
- `.page-header--two-col` switches to column layout
- Padding reduced to `2rem 1rem`
- Images/media stack below content
- Text remains centered

### Desktop
- Two-column layout displays side-by-side
- Flexible spacing with gap
- Content and media properly aligned

---

## Benefits

### 1. Consistency
- All headers follow the same pattern
- Predictable class names
- Easy to understand structure

### 2. Semantic HTML
- Proper use of `<header>` element
- Clear content hierarchy
- Improved accessibility

### 3. BEM Naming
- `.page-header` (Block)
- `.page-header--single` (Modifier)
- `.page-header__content` (Element)

### 4. Maintainability
- Single source of truth for header styles
- Easy to add new pages
- Consistent responsive behavior

### 5. Flexibility
- Two layout types cover all use cases
- Media container accepts any content
- Easy to extend with new modifiers

---

## Usage Guidelines

### When to Use Single Column
- Text-only headers
- Simple page titles
- FAQ, documentation, tool pages

### When to Use Two Column
- Headers with images
- Headers with icon grids
- Landing pages with visual elements

### Adding New Pages

```html
<!-- For text-only pages -->
<header class="page-header page-header--single">
  <div class="page-header__content">
    <h1>Your Page Title</h1>
    <p>Optional description</p>
  </div>
</header>

<!-- For pages with images/icons -->
<header class="page-header page-header--two-col">
  <div class="page-header__content">
    <h1>Your Page Title</h1>
    <p>Optional description</p>
  </div>
  <div class="page-header__media">
    <img src="your-image.png" alt="Description">
  </div>
</header>
```

---

## CSS Location

All page header styles are in `/assets/css/style.css`:
- Base styles: Lines ~350-403
- Legacy support: Lines ~405-442
- Responsive styles: Lines ~1860-1867

---

## Migration Notes

### What Changed
1. Wrapper element changed from `<div>` to `<header>` (semantic HTML)
2. Class names updated to BEM convention
3. Removed redundant wrapper divs
4. Standardized heading and paragraph elements

### Backwards Compatibility
- Legacy classes still work (marked as deprecated)
- No breaking changes for existing pages
- Can migrate pages gradually if needed

### Testing
- All pages tested on mobile and desktop
- Responsive behavior verified
- Navigation positioning unaffected

---

## Future Improvements

### Optional Enhancements
1. Add `.page-header--centered` for fully centered two-column layouts
2. Add `.page-header--compact` for reduced padding
3. Add `.page-header--hero` for extra-large headers
4. Consider adding animation classes for entrance effects

### Cleanup Phase
Once all pages are migrated and tested:
1. Remove legacy class definitions from CSS
2. Update any remaining old class references
3. Document final class list

---

## Quick Reference

| Old Pattern | New Pattern |
|------------|-------------|
| `<div class="title-container">` | `<header class="page-header page-header--single">` |
| `<div class="title-content-centered">` | `<div class="page-header__content">` |
| `<h1 class="main-title">` | `<h1>` |
| `<p class="main-subtitle">` | `<p>` |
| Two separate divs | `page-header__content` + `page-header__media` |

---

## Summary

✅ **8 pages updated** with standardized headers  
✅ **2 layout patterns** (single & two-column)  
✅ **BEM naming** throughout  
✅ **Semantic HTML** with `<header>` elements  
✅ **Responsive** by default  
✅ **Backwards compatible** with legacy classes  
✅ **Zero breaking changes**  

The page header system is now consistent, maintainable, and follows modern CSS best practices!
