# ⚡ ECE Student Portfolio

A modern, premium portfolio website for an Electronics & Communication Engineering student — built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

## 🔧 Features
- **3D Microchip** centerpiece built with Three.js (orbiting rings, signal nodes, emissive traces)
- **Animated circuit background** — PCB traces, signal particles, waveform overlay
- **Typewriter role animation** with 5 ECE-themed roles
- **Custom neon cursor** with smooth lag-ring
- **Skill bars** with animated fill on scroll entry
- **Project cards** that "power on" on hover
- **Signal-flow timeline** for experience section
- **Achievement badges** with ECE theme
- **Radar + Antenna** decorative visuals
- Fully responsive — desktop → mobile
- Glassmorphism cards, neon borders, scan-line effect

## 🗂 Sections
1. Hero — 3D chip + typewriter + animated background
2. About — bio, stats, interests, oscilloscope display
3. Skills — 4 ECE category panels with animated bars + chip cloud
4. Projects — 6 ECE-themed cards with power-on hover effect
5. Experience — signal-flow alternating timeline
6. Achievements — badge-style module grid
7. Contact — 4 contact cards + resume CTA
8. Footer — minimal technical closing

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:5173/ece-portfolio/
```

## 🔨 Build for Production

```bash
npm run build
# Output in ./dist/
```

## 🌐 Deploy to GitHub Pages

```bash
# 1. Push to GitHub repo named: ece-portfolio

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Add to package.json scripts:
#    "deploy": "gh-pages -d dist"

# 4. Build and deploy
npm run build && npm run deploy

# 5. In GitHub repo Settings → Pages → Source: gh-pages branch
# 6. Live at: https://yourusername.github.io/ece-portfolio/
```

## ✏️ Personalisation Checklist

Search and replace all placeholders:

| Placeholder | Replace with |
|---|---|
| `[Your Name]` | Your full name |
| `[Your Email]` | your@email.com |
| `[Your GitHub]` | https://github.com/yourusername |
| `[Your LinkedIn]` | https://linkedin.com/in/yourusername |
| `[Your College]` | Your institution name |
| `[Your Resume Link]` | Google Drive / PDF URL |
| `[your.email@domain.com]` | Your email address |
| `[yourusername]` | Your GitHub/LinkedIn handle |
| `[Your City, State, India]` | Your location |

Update project descriptions, experience, and achievements in:
- `src/components/Projects.jsx`
- `src/components/Experience.jsx`
- `src/components/Achievements.jsx`
- `src/components/About.jsx`

## 🛠 Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS v4**
- **Framer Motion** — scroll animations, transitions
- **Three.js** — 3D chip centerpiece
- **Google Fonts** — Share Tech Mono, Rajdhani, Exo 2

## 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.jsx         # Sticky nav with mobile menu
│   ├── Hero.jsx           # Hero + 3D chip + typewriter
│   ├── CircuitBackground.jsx  # Canvas circuit animation
│   ├── ChipCanvas.jsx     # Three.js 3D chip
│   ├── About.jsx          # Bio + stats + oscilloscope
│   ├── Skills.jsx         # ECE skill categories + bars
│   ├── Projects.jsx       # Project cards grid
│   ├── Experience.jsx     # Timeline
│   ├── Achievements.jsx   # Badge grid
│   ├── Contact.jsx        # Contact cards + footer
│   └── Cursor.jsx         # Custom neon cursor
├── App.jsx
├── main.jsx
└── index.css              # Design tokens + animations
```

---
*Built with circuits & caffeine ⚡ — Open to internships & research collaborations*
