# AnggiDesk — Portfolio Website

A clean, modern, and high-performance portfolio website inspired by [Faldesk](https://faldesk.freedev.app), built for **Anggi — Multi-Disciplinary Systems & Full-Stack Developer** (Frontend, Backend, IoT & Embedded Hardware, Server & Cloud Infrastructure).

Built using pure modern **HTML5, CSS3, and vanilla JavaScript (ES Modules)** with zero external build tools or heavy framework overhead.

---

## ✨ Features & Architecture

1. **Exact Faldesk Design System**:
   - Deep dark theme (`--bg-strong: #020617`, `--bg: #07111f`) with ambient cyan glows (`#38a8e8` / `#67e8f9`).
   - Smooth **One-Click Dark / Light Mode Toggle** with `localStorage` persistence.
   - Clean `Inter` typography, glassmorphic header, and pill badges.
2. **Hero Section**:
   - `Hi, I'm Anggi` with multi-disciplinary engineer bio.
   - Action buttons (`See My Work`, `Get In Touch`, `Download CV`).
   - Social chips row (`GitHub`, `LinkedIn`, `GitLab`, `Threads`, `TikTok`, `Email`).
   - Floating **Current Focus** card with macOS window dots and stat cards.
3. **Skills ("What I Do")**:
   - 3 structured panel cards: *Frameworks & Frontend*, *Languages & Core*, *Tools, Cloud & IoT*.
4. **Portofolio Showcase**:
   - 6 production project cards (SI-BARANG, Aegis Sentinel IoT, VortexKV, Titan Cloud, CyberPulse, PhytoSense).
   - High-fidelity preview cover SVGs, tech tag rows, and live Demo links.
5. **Interactive Fullscreen Lightbox Gallery Modal**:
   - Clicking **"Lihat Detail & Gallery"** opens the lightbox modal.
   - Next/Prev slide navigation, image counter, tags, keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`), and backdrop dismiss.
6. **Work & Achievements**:
   - Career timeline cards and recognition badges with glowing gradient icons.
7. **Contact Card**:
   - Signature contact card with avatar box (`Ang`), role text, email link, and direct contact buttons.

---

## 📁 Project Structure

```
ffortofolio1/
├── index.html                   # Semantic markup matching Faldesk
├── README.md                    # Documentation
├── css/
│   └── style.css                # Design tokens, themes (dark/light), cards, modals
├── js/
│   └── main.js                  # Theme toggle, mobile drawer, lightbox gallery
└── assets/
    └── images/                  # High-quality SVG preview covers
        ├── sibarang-cover.svg
        ├── iot-mesh-cover.svg
        ├── distributed-kv-cover.svg
        ├── titan-cloud-cover.svg
        ├── cyberpulse-cover.svg
        └── phytosense-cover.svg
```

---

## 🚀 How to Run Locally

Double-click `index.html` to open directly in any web browser, or serve with any static server:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000`.
