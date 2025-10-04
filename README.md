# Nexus Protocol - Sci-Fi RPG Community Website

A modern, immersive website for a Discord community built around a Roblox-based high-tech sci-fi open-world RPG game. Features a sleek, responsive design with futuristic aesthetics, 3D animations, and interactive elements.

## 🎮 Game Description

Nexus Protocol is an open-world sci-fi RPG with deep, challenging mechanics and player freedom:

- **Advanced parkour and fluid combat system**
- **Solo or co-op gameplay** – players can explore alone or with others
- **Crafting, building, scavenging, and base creation**
- **Urban exploration, underwater diving, and uncovering ancient civilizations**
- **Ability to hack and program bots for assistance**
- **Rich, evolving lore across multiple unique worlds**
- **Each world features a massive boss battle**
- **Offers Elden Ring-level difficulty, with adjustable difficulty modes**

## 🚀 Features

### Design & Aesthetics
- **Strict black, grey, and white color palette** with subtle cyan/blue accents
- **Futuristic typography** using Orbitron, Rajdhani, and Exo fonts
- **Dark, cinematic interface** with sci-fi HUD elements
- **Minimalist, modular layout** with clear hierarchy

### Interactive Elements
- **3D animated background** with particle system
- **Scroll-based parallax effects**
- **Hover-glow effects** on buttons and UI cards
- **Mouse-tracking for dynamic lighting**
- **Smooth scroll animations** using GSAP
- **Interactive gallery carousel**
- **Terminal-style FAQ interface**

### Responsive Design
- **Fully responsive** across desktop, tablet, and mobile
- **Mobile-first approach** with hamburger navigation
- **Optimized performance** for fast loading
- **Accessibility features** including focus states and reduced motion support

## 📁 Project Structure

```
nexus-protocol-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript** - Interactive functionality
- **GSAP** - Advanced animations and scroll effects
- **Three.js** - 3D particle system (CDN)
- **Google Fonts** - Futuristic typography

## 🎯 Website Sections

### 1. Landing Page
- 3D animated background with particles
- Animated game title/logo entrance
- Prominent Discord community CTA button
- Scroll indicator

### 2. About the Game
- Feature cards with hover animations
- Scroll-triggered animations
- Six key gameplay mechanics highlighted

### 3. Worlds & Lore
- Timeline-style world showcase
- Expandable lore panels
- Four unique worlds with detailed descriptions

### 4. Community Hub
- Discord server statistics
- Community features overview
- Direct Discord invite integration

### 5. Media Gallery
- Interactive 3D carousel
- Thumbnail navigation
- Hover overlay effects
- Keyboard navigation support

### 6. FAQ & Rules
- Terminal-style interface
- Accordion-style Q&A sections
- Server rules and gameplay tips

## 🔗 Discord Integration

The website prominently features the Discord community link:
**https://discord.gg/sz9eVcQTNx**

Integrated in:
- Landing page CTA button
- Community hub section
- Footer links
- Navigation elements

## 🎨 Color Palette

```css
/* Primary Colors */
--primary-black: #000000
--dark-grey: #1E1E1E
--medium-grey: #404040
--light-grey: #B0B0B0
--white: #FFFFFF

/* Accent Colors */
--cyan-accent: #00FFFF
--blue-accent: #0080FF
--green-accent: #00FF80
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## ⚡ Performance Optimizations

- **Lazy loading** for images and animations
- **Debounced scroll events** for better performance
- **Throttled resize handlers** to prevent excessive recalculations
- **Reduced motion support** for accessibility
- **Performance monitoring** with automatic degradation
- **Optimized animations** using requestAnimationFrame

## 🎭 Animation Features

- **GSAP ScrollTrigger** for scroll-based animations
- **Particle system** for 3D background effects
- **Hover animations** on interactive elements
- **Counter animations** for statistics
- **Parallax scrolling** effects
- **Smooth transitions** throughout the site

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Focus indicators** for all interactive elements
- **Reduced motion** support
- **High contrast** mode compatibility
- **Screen reader** friendly

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **No build process required** - runs directly in the browser
4. **For development**, use a local server for best performance

### Local Development Server

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🔧 Customization

### Changing Colors
Update the CSS custom properties in `styles.css`:

```css
:root {
    --cyan-accent: #00FFFF;  /* Change accent color */
    --primary-black: #000000; /* Change background */
}
```

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Add JavaScript functionality in `script.js`

### Modifying Animations
Adjust GSAP animations in the `setupAnimations()` method in `script.js`.

## 📊 Browser Support

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices and browsers
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Discord Community

Join our Discord community to connect with fellow players, share strategies, and participate in exclusive events:

**[Join Discord Server](https://discord.gg/sz9eVcQTNx)**

---

*Built with ❤️ for the Nexus Protocol gaming community*
