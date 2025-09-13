# Font Reference Tool

A simple **local font browser** built with React + Tailwind.
Lets you explore the fonts installed on your system using Chrome’s **Local Font Access API**.

I got ChatGPT to write this for me, ngl.

---

## Features

* 📋 Lists all locally available font families.
* ✍️ Sample text input at the top — updates all previews live.
* 🔍 Slider to adjust preview font size.
* 📂 Local storage caching so you don’t need to re-request fonts on every reload.
* ▶️ Expand/collapse each family to view all its variants (Regular, Bold, Italic, etc.).
* ↔️ Collapsed view shows a quick comma-delimited list of available styles.

---

## Requirements

* **Chromium-based browser** (Chrome, Edge, Opera).

  * Firefox and Safari **do not support** `queryLocalFonts()` yet.
* Must run from a secure context (**https\://** or localhost).
* User interaction is required to access local fonts:

  * The first time you click **“Update list”**, Chrome will prompt:

    > “Allow this site to access your local fonts?”
  * You must grant permission to load the fonts.

---

## How It Works

* On first load, checks `localStorage.fontList` for a cached font list.
* If missing, no table is displayed until you click **“Update list”**.
* Clicking **“Update list”** calls the Local Font Access API, saves results to `localStorage`, and updates the UI.
* Fonts are grouped by family:

  * One “main” row per family (preferring *Regular* if available).
  * Expand/collapse toggles to show or hide the variant rows.

---

## Limitations

* The metadata returned by `queryLocalFonts()` (`fullName`, `family`, `style`) doesn’t always map cleanly to CSS `font-family`.

  * Some variants may render the same (e.g., variable fonts).
* Font styles are displayed using the reported `fullName`, but browser support for every variant is inconsistent.
* This tool is **best-effort** — it’s meant for exploration, not guaranteed typography accuracy.

---

## Development Notes

* Built with **React 19**, **Tailwind 4**, and **Vite**.
* State is stored in memory, except for cached font lists in `localStorage`.
* Expand/collapse state is *not* persisted — it resets on refresh.
