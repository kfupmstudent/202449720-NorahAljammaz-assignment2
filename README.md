   # 202449720-NorahAljammaz-assignment2
# Personal Portfolio
## Project Description
This is my personal portfolio website, built for Assignment 2 of SWE 206. This version adds interactive features: project filtering and search, live GitHub data, animations, and better form feedback.It introduces me, showcases two of my real projects — **Breaker** (a campus social app concept) and
**Darsi** (an on-demand tutor marketplace) — and provides a way to get in touch. It's
built with plain HTML, CSS, and JavaScript (no framework), and is responsive across
desktop, tablet, and mobile.

**Sections included:**
- **About Me** — short intro, tagline, and profile photo
- **Projects** — Breaker and Darsi, with descriptions, live design links, and preview images with filter and search
- **GitHub Repositories** — my latest public repositories, loaded live from the GitHub API
- **Skills** — a quick list of tools and strengths
- **Contact** — a form (front-end only) plus direct email, phone, and LinkedIn links

**Interactive features (JavaScript):**
- Dark / light theme toggle (saved between visits with `localStorage`)
- Time-of-day greeting message ("Good morning / afternoon / evening")
- Mobile hamburger navigation menu
- Contact form validation with inline feedback
   - Project filter buttons and live search (shows or hides projects as you type)
   - "Read more / Show less" toggle on project descriptions
   - GitHub repositories loaded from the public GitHub API, with a loading message, a friendly error with a "Try again" button, and an empty-state message
   - Contact form with a specific error under each invalid field and a confirmation message
   - Scroll fade-in, hover effects, and animated form messages

## Folder Structure
```
202449720-NorahAljammaz-assignment2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Setup Instructions (Run Locally)
No build tools or installations are required.

1. Clone this repository:
   ```
     git clone https://github.com/kfupmstudent/202449720-NorahAljammaz-assignment2.git
   ```
2. Open the project folder.
3. Double-click `index.html` to open it in your browser, **or** use a live-reload tool
   such as the VS Code "Live Server" extension for automatic refresh while editing.

That's it — An internet connection is only needed for the GitHub Repositories section. Offline, that section shows a friendly error and the rest of the site works.
## AI Use Summary
I used a few AI tools throughout this project, each for a different part:
- **Claude** generated the initial site template (HTML/CSS/JS structure) as a starting
  point, and I later used it again for a final review pass that caught a few things I'd
  missed.
- **Gemini** helped write my project descriptions and generated my logo image.
- **ChatGPT** - Used to review work again to make sure all requirements were met. Used to help clone repositry.
- **Claude** Used to generqte code for assignment 2 additional feautures they were reviewed by me 

I reviewed and edited everything the AI produced — fixing broken or mismatched code,
rewriting content to reflect my actual work, and adjusting the styling myself. AI sped
up the process significantly, but it didn't get everything right on its own; figuring
out how the files linked together correctly was something I had to work through myself.
Full details, including the specific benefits, challenges, and how I verified the
output, are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).
