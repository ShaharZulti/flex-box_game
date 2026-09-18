# 👨‍🍳 World Bistro: Flexbox Edition

> **An interactive culinary arcade game teaching CSS Flexbox through tactile puzzles.**  
> Built with **Pure HTML5, CSS3, and Vanilla JavaScript** — Zero external frameworks or libraries.

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://shaharzulti.github.io/flex-box_game/)
[![Assignment](https://img.shields.io/badge/College%20Assignment-Exercise%202-orange?style=for-the-badge)](https://github.com/ShaharZulti/flex-box_game)
[![Vanilla JS](https://img.shields.io/badge/Pure-Vanilla%20JS-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS Flexbox](https://img.shields.io/badge/Layout-CSS%20Flexbox-blue?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

---

## 👥 Authors & Creators
* **Rotem Segal** — 2nd-Year Computer Science Student
* **Shahar Zulti** — 2nd-Year Computer Science Student

---

## 🌐 Live Game Links
* **Live Demo (GitHub Pages)**: [https://shaharzulti.github.io/flex-box_game/](https://shaharzulti.github.io/flex-box_game/)
* **Source Repository**: [https://github.com/ShaharZulti/flex-box_game](https://github.com/ShaharZulti/flex-box_game)

---

## 📖 About The Game
**World Bistro: Flexbox Edition** is a casual, restaurant-themed educational game inspired by arcade cooking games like *Overcooked* and *Diner Dash*. 

Players take on the role of head chef, arranging delicious international cuisines onto the plates of hungry guests from around the globe (Tokyo sushi, Napoli pizza, Mexican tacos, and Tel Aviv refreshments). By dragging and dropping or clicking CSS Flexbox property blocks into a live simulated code editor, players learn how flex properties control the layout, flow, direction, and distribution of elements.

---

## 🎯 Features & Highlights

### 🕹️ Core Gameplay
* **7 Progressive Stages**: Carefully crafted difficulty curve from basic single-axis alignment to complex multi-property wrapping and reverse directions.
* **Drag-and-Drop + Click/Tap Controls**: Full HTML5 Drag-and-Drop desktop support with instant tap/click fallbacks for smooth mobile gameplay.
* **Live Code Simulator**: Clean syntax-highlighted CSS editor simulating `#dining-table { display: flex; ... }`.
* **Instant Visual & Audio Feedback**:
  * **FLIP Animations**: Food dishes smoothly slide across the table to their target plates using bouncy spring easing.
  * **Error Feedback**: Table wobble animation, audio alert, and friendly toast notification.
  * **Victory Celebrations**: Confetti fireworks canvas, glowing table borders, and custom fanfares.
* **Flexbox Reference Guide (`!`)**: An in-game interactive cheat sheet modal detailing `justify-content`, `align-items`, `flex-direction`, and `flex-wrap` with clear explanations.
* **Grand Victory Trophy 🏆**: Golden chef trophy modal upon completing all 7 levels.

### 📱 Responsive & Resolution-Independent
* **Fixed 500×500px Board Coordinate System**:  
  The dining table strictly maintains a 500×500 coordinate space across all devices. This guarantees that multi-line wrapping (`flex-wrap: wrap` in Level 6) and item distributions produce the **exact same solution regardless of screen resolution**.
* **Seamless Mobile Scaling**:  
  On mobile devices (320px–430px), the board scales dynamically without clipping or dead space using top-center transform scaling.
* **Responsive Single-Page Layout**:  
  The interface reorganizes fluidly between mobile vertical flow and desktop side-by-side split layout (table on left, code builder on right).

### 💾 Persistence & Audio
* **LocalStorage Tracking**: Automatically saves completed levels, tracks culinary mastery percentage (0%–100%), and remembers audio mute settings.
* **Replayability**: Home dashboard allows jumping to and replaying any unlocked or completed stage, plus a "Reset All Progress" button.
* **Web Audio API**: 100% synthesized sound effects generated natively in code (no external mp3/wav files required) with a one-click mute toggle.

---

## 🍽️ Levels & Flexbox Concepts Covered

| Level | Title | Setting & Dishes | Flexbox Properties Mastered |
| :---: | :--- | :--- | :--- |
| **1** | **Tokyo Sushi Rush** | 2 Japanese guests, sushi rolls | `justify-content: flex-end` |
| **2** | **Napoli Pizza Special** | 2 Italian guests, pepperoni pizzas | `align-items: center` |
| **3** | **A Global Celebration** | Japanese, Italian, Mexican guests & dishes | `flex-direction: row-reverse` |
| **4** | **Tel Aviv Rooftop Refreshment** | 3 Israeli guests, cold beverages | `justify-content: space-between` + `align-items: center` |
| **5** | **Kyoto Traditional Dining** | 3 seated guests in traditional column layout | `flex-direction: column` + `align-items: center` |
| **6** | **Guadalajara Taco Party** | 6 hungry guests, 6 crispy beef tacos | `flex-wrap: wrap` + `justify-content: space-around` |
| **7** | **The Grand Finale!** | 3 VIP international guests, full banquet | `flex-direction: column-reverse` + `justify-content: space-between` + `align-items: flex-end` |

---

## 🛠️ Technology Stack & Architecture

* **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<footer`, `<canvas>`), ARIA labels, accessible modals.
* **CSS3**: Modern Flexbox, CSS custom properties (variables), clamp typography, 3D button styling, keyframe animations, responsive media queries. Zero CSS frameworks.
* **Vanilla JavaScript (ES6 Modules)**:
  * `js/app.js`: Main application controller, view manager, DOM lifecycle bootstrap, and dynamic scaling.
  * `js/game.js`: Game engine, coordinate handling, FLIP animation calculations, and solution validator.
  * `js/dnd.js`: Drag-and-drop controller, touch/click assignment, and code slot state manager.
  * `js/levels.js`: Level configurations, characters, winning solutions, and cheat sheet definitions.
  * `js/storage.js`: Robust `localStorage` wrapper with array validation and fault-tolerant parsing.
  * `js/audio.js`: Native Web Audio API sound synthesizer (click, drop, serve, error, win, trophy).
  * `js/confetti.js`: Lightweight HTML5 canvas particle fireworks system.
* **Zero External Dependencies**: Pure native browser APIs.

---

## 📂 Project Structure

```text
flex-box_game/
├── index.html              # Main Single-Page Application entry point
├── checklist.md            # Assignment requirements checklist
├── README.md               # Project documentation & guide
├── .nojekyll               # Bypasses Jekyll on GitHub Pages
├── css/
│   ├── base.css            # Color variables, typography, and base resets
│   ├── layout.css          # Views, navigation, hero banner, and responsive grid
│   ├── board.css           # 500x500 dining table, guest slots, and dish layers
│   ├── code-builder.css    # CSS editor terminal, drop slots, and tactile chips
│   └── animations.css      # Table shake, victory glow, and confetti transitions
├── js/
│   ├── app.js              # Application entry point & screen coordinator
│   ├── audio.js            # Synthesized Web Audio API sound effects
│   ├── confetti.js         # Canvas particle explosion system
│   ├── dnd.js              # Drag-and-drop & tap-to-place editor logic
│   ├── game.js             # Table rendering, FLIP glide animations & validation
│   ├── levels.js           # 7 level configs, target styles & cheat sheet guide
│   └── storage.js          # LocalStorage persistence manager
└── assets/
    ├── backgrounds/        # Warm restaurant kitchen scene
    ├── characters/         # Chef mascot, Japanese, Italian, Israeli, Mexican guests
    ├── creators/           # Emoji avatars of Rotem Segal & Shahar Zulti
    ├── foods/              # Sushi, pizza, taco, iced drink dishes
    └── icons/              # Golden Chef Trophy
```

---

## 🚀 Running Locally

Because the project uses standard ES6 modules (`import` / `export`), it should be served via a local web server (or opened in an IDE like VS Code with Live Server):

### Option 1: Python 3 (Recommended)
```bash
# Navigate to the project root directory
cd path/to/flex-box_game

# Start Python's built-in HTTP server
python3 -m http.server 8000
```
Then open your browser at **`http://localhost:8000`**.

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 📜 License & Academic Integrity
Developed by **Rotem Segal** & **Shahar Zulti** for Academic Coursework — Assignment 2 (Web Development).  
All rights reserved © 2026.
